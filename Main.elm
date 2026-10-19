port module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode
import Json.Encode as Encode
import Platform.Sub exposing (Sub)


-- PORTS

port saveData : String -> Cmd msg

port loadData : (String -> msg) -> Sub msg

port notifyUser : String -> Cmd msg


-- TYPES & MODEL

type Tab
    = OverviewTab
    | HabitsTab
    | TasksTab
    | GoalsTab
    | AnalyticsTab


type alias Habit =
    { name : String
    , category : String
    , timeOfDay : String
    , completed : Bool
    , streak : Int
    , editing : Bool
    }


type alias Task =
    { title : String
    , category : String
    , priority : String
    , durationMinutes : Int
    , completed : Bool
    , dueDate : String
    }


type alias Goal =
    { name : String
    , category : String
    , target : Int
    , progress : Int
    , dueDate : String
    }


type alias Model =
    { activeTab : Tab
    , darkMode : Bool
    , searchInput : String
    , habitFilter : String
    -- Form Inputs
    , habitNameInput : String
    , taskTitleInput : String
    , goalNameInput : String
    -- Collections
    , habits : List Habit
    , tasks : List Task
    , goals : List Goal
    , streak : Int
    }


init : Model
init =
    { activeTab = OverviewTab
    , darkMode = False
    , searchInput = ""
    , habitFilter = "All"
    , habitNameInput = ""
    , taskTitleInput = ""
    , goalNameInput = ""
    , habits =
        [ { name = "Morning Meditation & Breathing", category = "Health", timeOfDay = "Morning", completed = True, streak = 6, editing = False }
        , { name = "Read Dissertation Literature", category = "Academic", timeOfDay = "Afternoon", completed = True, streak = 12, editing = False }
        , { name = "30-min Evening Cardio Jog", category = "Fitness", timeOfDay = "Evening", completed = False, streak = 4, editing = False }
        ]
    , tasks =
        [ { title = "Q1 Report Done", category = "Academic", priority = "High", durationMinutes = 120, completed = True, dueDate = "2026-01-08" }
        , { title = "Review Request", category = "Design", priority = "Medium", durationMinutes = 45, completed = False, dueDate = "2026-01-06" }
        , { title = "Team Meetings", category = "Work", priority = "Medium", durationMinutes = 60, completed = True, dueDate = "2026-01-06" }
        , { title = "Activated Tasks", category = "System", priority = "Medium", durationMinutes = 30, completed = False, dueDate = "2026-01-07" }
        ]
    , goals =
        [ { name = "Designing app reviews pages", category = "Design", target = 10, progress = 10, dueDate = "2026-08-25" }
        , { name = "Preparing UX testing phase", category = "Research", target = 10, progress = 5, dueDate = "2026-08-31" }
        , { name = "Complete HIT Dissertation Web App", category = "Academic", target = 10, progress = 9, dueDate = "2026-08-30" }
        ]
    , streak = 12
    }


-- MESSAGES

type Msg
    = SwitchTab Tab
    | SetDarkMode Bool
    | UpdateSearch String
    | UpdateHabitNameInput String
    | UpdateTaskTitleInput String
    | UpdateGoalNameInput String
    | AddHabit
    | ToggleHabit Int
    | DeleteHabit Int
    | AddTask
    | ToggleTask Int
    | DeleteTask Int
    | AddGoal
    | StepGoal Int
    | DeleteGoal Int
    | RemindMe
    | DataLoaded String


-- UPDATE

update : Msg -> Model -> Model
update msg model =
    case msg of
        SwitchTab tab ->
            { model | activeTab = tab }

        SetDarkMode val ->
            { model | darkMode = val }

        UpdateSearch query ->
            { model | searchInput = query }

        UpdateHabitNameInput val ->
            { model | habitNameInput = val }

        UpdateTaskTitleInput val ->
            { model | taskTitleInput = val }

        UpdateGoalNameInput val ->
            { model | goalNameInput = val }

        AddHabit ->
            if String.isEmpty model.habitNameInput then
                model

            else
                let
                    newH =
                        { name = model.habitNameInput
                        , category = "General"
                        , timeOfDay = "Morning"
                        , completed = False
                        , streak = 0
                        , editing = False
                        }
                in
                { model | habitNameInput = "", habits = model.habits ++ [ newH ] }

        ToggleHabit index ->
            { model
                | habits =
                    List.indexedMap
                        (\i h ->
                            if i == index then
                                { h | completed = not h.completed }

                            else
                                h
                        )
                        model.habits
            }

        DeleteHabit index ->
            { model | habits = List.filter (\( i, _ ) -> i /= index) (List.indexedMap (\i h -> ( i, h )) model.habits) |> List.map Tuple.second }

        AddTask ->
            if String.isEmpty model.taskTitleInput then
                model

            else
                let
                    newT =
                        { title = model.taskTitleInput
                        , category = "Work"
                        , priority = "Medium"
                        , durationMinutes = 30
                        , completed = False
                        , dueDate = "2026-01-10"
                        }
                in
                { model | taskTitleInput = "", tasks = model.tasks ++ [ newT ] }

        ToggleTask index ->
            { model
                | tasks =
                    List.indexedMap
                        (\i t ->
                            if i == index then
                                { t | completed = not t.completed }

                            else
                                t
                        )
                        model.tasks
            }

        DeleteTask index ->
            { model | tasks = List.filter (\( i, _ ) -> i /= index) (List.indexedMap (\i t -> ( i, t )) model.tasks) |> List.map Tuple.second }

        AddGoal ->
            if String.isEmpty model.goalNameInput then
                model

            else
                let
                    newG =
                        { name = model.goalNameInput
                        , category = "Personal"
                        , target = 10
                        , progress = 0
                        , dueDate = "2026-08-30"
                        }
                in
                { model | goalNameInput = "", goals = model.goals ++ [ newG ] }

        StepGoal index ->
            { model
                | goals =
                    List.indexedMap
                        (\i g ->
                            if i == index then
                                { g | progress = min g.target (g.progress + 1) }

                            else
                                g
                        )
                        model.goals
            }

        DeleteGoal index ->
            { model | goals = List.filter (\( i, _ ) -> i /= index) (List.indexedMap (\i g -> ( i, g )) model.goals) |> List.map Tuple.second }

        RemindMe ->
            model

        DataLoaded _ ->
            model


updateWithCmd : Msg -> Model -> ( Model, Cmd Msg )
updateWithCmd msg model =
    let
        newModel = update msg model
    in
    ( newModel, saveData (Encode.encode 0 (modelEncoder newModel)) )


-- ENCODERS

habitEncoder : Habit -> Encode.Value
habitEncoder h =
    Encode.object
        [ ( "name", Encode.string h.name )
        , ( "completed", Encode.bool h.completed )
        , ( "streak", Encode.int h.streak )
        ]


taskEncoder : Task -> Encode.Value
taskEncoder t =
    Encode.object
        [ ( "title", Encode.string t.title )
        , ( "completed", Encode.bool t.completed )
        , ( "priority", Encode.string t.priority )
        ]


goalEncoder : Goal -> Encode.Value
goalEncoder g =
    Encode.object
        [ ( "name", Encode.string g.name )
        , ( "target", Encode.int g.target )
        , ( "progress", Encode.int g.progress )
        ]


modelEncoder : Model -> Encode.Value
modelEncoder m =
    Encode.object
        [ ( "darkMode", Encode.bool m.darkMode )
        , ( "habits", Encode.list habitEncoder m.habits )
        , ( "tasks", Encode.list taskEncoder m.tasks )
        , ( "goals", Encode.list goalEncoder m.goals )
        ]


-- VIEW

view : Model -> Html Msg
view model =
    div [ class "taskly-outer-frame" ]
        [ viewIconSidebar model
        , div [ class "taskly-main-content" ]
            [ viewHeader model
            , div [ class "taskly-body-grid" ]
                [ div [ class "center-content-panel" ] [ viewCenterPanel model ]
                , viewRightSidebar model
                ]
            ]
        ]


viewIconSidebar : Model -> Html Msg
viewIconSidebar model =
    aside [ class "icon-sidebar" ]
        [ div [ class "theme-btn-group" ]
            [ button [ class (if not model.darkMode then "theme-btn active" else "theme-btn"), onClick (SetDarkMode False) ] [ text "☀️" ]
            , button [ class (if model.darkMode then "theme-btn active" else "theme-btn"), onClick (SetDarkMode True) ] [ text "🌙" ]
            ]
        , div [ class "nav-icons" ]
            [ button [ class (if model.activeTab == OverviewTab then "icon-nav-btn active" else "icon-nav-btn"), onClick (SwitchTab OverviewTab) ] [ text "🎛️" ]
            , button [ class (if model.activeTab == HabitsTab then "icon-nav-btn active" else "icon-nav-btn"), onClick (SwitchTab HabitsTab) ] [ text "⚡" ]
            , button [ class (if model.activeTab == TasksTab then "icon-nav-btn active" else "icon-nav-btn"), onClick (SwitchTab TasksTab) ] [ text "✅" ]
            , button [ class (if model.activeTab == GoalsTab then "icon-nav-btn active" else "icon-nav-btn"), onClick (SwitchTab GoalsTab) ] [ text "🎯" ]
            , button [ class (if model.activeTab == AnalyticsTab then "icon-nav-btn active" else "icon-nav-btn"), onClick (SwitchTab AnalyticsTab) ] [ text "📈" ]
            ]
        ]


viewHeader : Model -> Html Msg
viewHeader model =
    header [ class "taskly-header" ]
        [ div [ class "taskly-brand" ]
            [ div [ class "brand-logo-icon" ] [ text "T" ]
            , span [ class "brand-logo-text" ] [ text "HIT TRACKER" ]
            ]
        , nav [ class "top-pill-nav" ]
            [ button [ class (if model.activeTab == OverviewTab then "pill-nav-btn active" else "pill-nav-btn"), onClick (SwitchTab OverviewTab) ] [ text "Overview" ]
            , button [ class (if model.activeTab == HabitsTab then "pill-nav-btn active" else "pill-nav-btn"), onClick (SwitchTab HabitsTab) ] [ text "Habits" ]
            , button [ class (if model.activeTab == TasksTab then "pill-nav-btn active" else "pill-nav-btn"), onClick (SwitchTab TasksTab) ] [ text "Tasks" ]
            , button [ class (if model.activeTab == GoalsTab then "pill-nav-btn active" else "pill-nav-btn"), onClick (SwitchTab GoalsTab) ] [ text "Goals" ]
            , button [ class (if model.activeTab == AnalyticsTab then "pill-nav-btn active" else "pill-nav-btn"), onClick (SwitchTab AnalyticsTab) ] [ text "Analytics" ]
            ]
        ]


viewCenterPanel : Model -> Html Msg
viewCenterPanel model =
    div []
        [ div [ class "workspace-banner" ]
            [ div [ class "banner-left" ]
                [ div [ class "banner-sparkle" ] [ text "✨" ]
                , span [ class "banner-title" ] [ text "HIT Dissertation Workspace" ]
                ]
            ]
        , div [ class "metrics-three-grid" ]
            [ div [ class "gauge-metric-card" ]
                [ div [ class "gauge-header" ] [ text "✓ Task Completion" ]
                , div [ class "gauge-body" ] [ h3 [] [ text "88%" ] ]
                ]
            , div [ class "gauge-metric-card" ]
                [ div [ class "gauge-header" ] [ text "🕒 Time Focused" ]
                , div [ class "gauge-body" ] [ h3 [] [ text "120.42" ] ]
                ]
            , div [ class "gauge-metric-card" ]
                [ div [ class "gauge-header" ] [ text "📄 Productivity Score" ]
                , div [ class "gauge-body" ] [ h3 [] [ text "75/100" ] ]
                ]
            ]
        ]


viewRightSidebar : Model -> Html Msg
viewRightSidebar model =
    aside [ class "right-sidebar-panel" ]
        [ h3 [ class "right-panel-title" ] [ text "Your Recent Project Work" ]
        , div [ class "project-card" ]
            [ span [ class "project-card-title" ] [ text "Designing app reviews pages" ]
            , div [ class "project-progress-bar" ] [ div [ class "project-progress-fill", style "width" "100%" ] [] ]
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    loadData DataLoaded


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( init, Cmd.none )
        , update = updateWithCmd
        , view = view
        , subscriptions = subscriptions
        }