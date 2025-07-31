// // import { Button, Input,} from "antd";
// // import { useReducer } from "react";

// // const initialState = { count: 0, value1: "", color: false };
// // function reducer(state: any, action: any) {
// //   switch (action.type) {
// //     case "incremnet":
// //       return { ...state, count: state.count + 1 };
// //     case "decremnet":
// //       return { ...state, count: state.count - 1 };
// //     case "toggleColor":
// //       return { ...state, color: !state.color };
// //     case "inputValue":
// //       return { ...state, value1: action.payload };
// //     default:
// //       return state;
// //   }
// // }

// // const Reducer = () => {
// //   const [state, dispatch] = useReducer(reducer, initialState);
// //   return (
// //     <>
// //       <h1 style={{ color: state.color ? "#fff" : "red", width:4 }}>
// //         Count:{state.count}
// //       </h1>
// //       <Input type="text" value={state.value1} onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}/>
// //       <Button onClick={()=> dispatch({type:"incremnet"})}>+</Button>
// //       <Button onClick={()=> dispatch({type:"decremnet"})}>-</Button>
// //       <Button onClick={()=> dispatch({type:"toggleColor"})}>rangggggg</Button>
// //       <h1 style={{color:"red"}}>{state.value1}</h1>

// //     </>
// //   );
// // };

// // export default Reducer;



//------------------------------------------------








// import { useState, useReducer, useEffect } from "react";
// import {
//   Button,
//   Input,
//   List,
//   Space,
//   Card,
//   Progress,
//   Typography,
//   Checkbox,
//   ConfigProvider,
//   theme,
// } from "antd";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   BgColorsOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// interface State {
//   count: number;
//   value1: string;
//   color: boolean;
//   todos: Todo[];
//   progress: number;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// const initialState: State = {
//   count: 0,
//   value1: "",
//   color: false,
//   todos: [],
//   progress: 0,
// };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "increment":
//       return { ...state, count: state.count + 1 };
//     case "decrement":
//       return { ...state, count: state.count - 1 };
//     case "toggleColor":
//       return { ...state, color: !state.color };
//     case "inputValue":
//       return { ...state, value1: action.payload };
//     case "add":
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           { id: Date.now(), text: action.payload, completed: false },
//         ],
//       };
//     case "delete":
//       return {
//         ...state,
//         todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
//       };
//     case "update":
//       return {
//         ...state,
//         todos: state.todos.map((todo: Todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, text: action.payload.text }
//             : todo
//         ),
//       };
//     case "toggleComplete":
//       return {
//         ...state,
//         todos: state.todos.map((todo: Todo) =>
//           todo.id === action.payload
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         ),
//       };
//     case "setProgress":
//       return { ...state, progress: action.payload };
//     default:
//       return state;
//   }
// }

// const ModernTodoApp = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [todoInput, setTodoInput] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const handleAddUpdate = () => {
//     if (editingId !== null) {
//       dispatch({
//         type: "update",
//         payload: { id: editingId, text: todoInput },
//       });
//       setEditingId(null);
//     } else {
//       if (todoInput.trim() !== "") {
//         dispatch({ type: "add", payload: todoInput });
//       }
//     }
//     setTodoInput("");
//   };

//   const handleEdit = (todo: Todo) => {
//     setTodoInput(todo.text);
//     setEditingId(todo.id);
//   };

//   useEffect(() => {
//     if (state.todos.length > 0) {
//       const completedCount = state.todos.filter((todo) => todo.completed).length;
//       const newProgress = (completedCount / state.todos.length) * 100;
//       dispatch({ type: "setProgress", payload: Math.round(newProgress) });
//     } else {
//       dispatch({ type: "setProgress", payload: 0 });
//     }
//   }, [state.todos]);

//   const isDark = state.color;

//   // Theme configuration for Ant Design
//   const themeConfig = {
//     algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
//     token: {
//       colorPrimary: isDark ? "#6b7280" : "#1f2937",
//       borderRadius: 12,
//       colorBgContainer: isDark ? "#374151" : "#ffffff",
//       colorBgElevated: isDark ? "#374151" : "#ffffff",
//       colorBgLayout: isDark ? "#111827" : "#f9fafb",
//       colorText: isDark ? "#e5e7eb" : "#1f2937",
//       colorTextSecondary: isDark ? "#9ca3af" : "#6b7280",
//     },
//   };

//   return (
//     <ConfigProvider theme={themeConfig}>
//       <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
//         isDark ? 'bg-gray-900' : 'bg-gray-50'
//       }`}>
//         <div className="max-w-2xl mx-auto space-y-6">
//           {/* Progress Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '24px' }
//             }}
//           >
//             <div className="flex items-center justify-between mb-3">
//               <Text className={`text-sm font-medium ${
//                 isDark ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Progress
//               </Text>
//               <Text className={`text-sm ${
//                 isDark ? 'text-gray-400' : 'text-gray-500'
//               }`}>
//                 {state.progress}%
//               </Text>
//             </div>
//             <Progress
//               percent={state.progress}
//               showInfo={false}
//               strokeColor={isDark ? '#9ca3af' : '#1f2937'}
//               trailColor={isDark ? '#4b5563' : '#e5e7eb'}
//               className="transition-colors duration-300"
//             />
//           </Card>

//           {/* Counter Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '32px', textAlign: 'center' }
//             }}
//           >
//             <Title 
//               level={2} 
//               className={`!mb-6 !font-light transition-colors duration-300 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}
//             >
//               Count: {state.count}
//             </Title>
//             <Space size="large">
//               <Button
//                 type="primary"
//                 shape="circle"
//                 size="large"
//                 onClick={() => dispatch({ type: "increment" })}
//                 className={`w-12 h-12 flex items-center justify-center text-xl font-light transition-colors duration-200 ${
//                   isDark 
//                     ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
//                     : 'bg-gray-900 border-gray-900 hover:bg-gray-800'
//                 }`}
//               >
//                 +
//               </Button>
//               <Button
//                 shape="circle"
//                 size="large"
//                 onClick={() => dispatch({ type: "decrement" })}
//                 className={`w-12 h-12 flex items-center justify-center text-xl font-light transition-colors duration-200 ${
//                   isDark 
//                     ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' 
//                     : 'bg-gray-200 border-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 −
//               </Button>
//               <Button
//                 shape="circle"
//                 size="large"
//                 icon={<BgColorsOutlined />}
//                 onClick={() => dispatch({ type: "toggleColor" })}
//                 className={`w-12 h-12 flex items-center justify-center transition-colors duration-200 ${
//                   isDark 
//                     ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
//                     : 'bg-gray-100 border-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               />
//             </Space>
//           </Card>

//           {/* Name Input Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '24px' }
//             }}
//           >
//             <Title 
//               level={3} 
//               className={`!mb-4 transition-colors duration-300 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}
//             >
//               Name Input
//             </Title>
//             <Space direction="vertical" className="w-full" size="large">
//               <Input
//                 placeholder="Enter your name..."
//                 value={state.value1}
//                 onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}
//                 size="large"
//                 className={`transition-all duration-200 ${
//                   isDark 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
//                     : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'
//                 }`}
//               />
//               {state.value1 && (
//                 <Text className={`transition-colors duration-300 ${
//                   isDark ? 'text-gray-300' : 'text-gray-600'
//                 }`}>
//                   Hello, {state.value1}!
//                 </Text>
//               )}
//             </Space>
//           </Card>

//           {/* Todo Manager Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '24px' }
//             }}
//           >
//             <Title 
//               level={3} 
//               className={`!mb-6 transition-colors duration-300 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}
//             >
//               Todo Manager
//             </Title>
            
//             <Space direction="vertical" className="w-full" size="large">
//               <Space.Compact className="w-full">
//                 <Input
//                   placeholder="Enter your todo..."
//                   value={todoInput}
//                   onChange={(e) => setTodoInput(e.target.value)}
//                   onPressEnter={handleAddUpdate}
//                   size="large"
//                   className={`transition-all duration-200 ${
//                     isDark 
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
//                       : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'
//                   }`}
//                 />
//                 <Button
//                   type="primary"
//                   size="large"
//                   onClick={handleAddUpdate}
//                   icon={editingId !== null ? <EditOutlined /> : <PlusOutlined />}
//                   className={`transition-colors duration-200 ${
//                     isDark 
//                       ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
//                       : 'bg-gray-900 border-gray-900 hover:bg-gray-800'
//                   }`}
//                 >
//                   {editingId !== null ? "Update" : "Add"}
//                 </Button>
//               </Space.Compact>

//               {state.todos.length > 0 ? (
//                 <List
//                   bordered
//                   dataSource={state.todos}
//                   className={`transition-colors duration-300 ${
//                     isDark ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                   renderItem={(todo: Todo) => (
//                     <List.Item
//                       actions={[
//                         <Button
//                           key="edit"
//                           type="text"
//                           icon={<EditOutlined />}
//                           onClick={() => handleEdit(todo)}
//                           className={`transition-colors duration-200 ${
//                             isDark 
//                               ? 'text-gray-400 hover:text-gray-200' 
//                               : 'text-gray-500 hover:text-gray-700'
//                           }`}
//                         >
//                           Edit
//                         </Button>,
//                         <Button
//                           key="delete"
//                           type="text"
//                           danger
//                           icon={<DeleteOutlined />}
//                           onClick={() => dispatch({ type: "delete", payload: todo.id })}
//                           className={`transition-colors duration-200 ${
//                             isDark 
//                               ? 'text-gray-400 hover:text-red-400' 
//                               : 'text-gray-500 hover:text-red-500'
//                           }`}
//                         >
//                           Delete
//                         </Button>,
//                       ]}
//                       className={`transition-colors duration-300 ${
//                         isDark 
//                           ? 'border-gray-700 hover:bg-gray-800' 
//                           : 'border-gray-100 hover:bg-gray-50'
//                       }`}
//                     >
//                       <Space>
//                         <Checkbox
//                           checked={todo.completed}
//                           onChange={() => dispatch({ type: "toggleComplete", payload: todo.id })}
//                           className={`transition-colors duration-200 ${
//                             isDark ? 'text-gray-300' : 'text-gray-700'
//                           }`}
//                         />
//                         <Text
//                           className={`transition-colors duration-200 ${
//                             todo.completed 
//                               ? isDark ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
//                               : isDark ? 'text-gray-200' : 'text-gray-700'
//                           }`}
//                         >
//                           {todo.text}
//                         </Text>
//                       </Space>
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <div className="text-center py-12">
//                   <Text className={`transition-colors duration-300 ${
//                     isDark ? 'text-gray-500' : 'text-gray-400'
//                   }`}>
//                     No todos yet. Add your first task!
//                   </Text>
//                 </div>
//               )}
//             </Space>
//           </Card>
//         </div>
//       </div>
//     </ConfigProvider>
//   );
// };

// export default ModernTodoApp;


//-----------------------





import { useState, useReducer, useEffect } from "react";
import {
  Button,
  Input,
  List,
  Space,
  Card,
  Progress,
  Typography,
  Checkbox,
  ConfigProvider,
  theme,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  count: number;
  value1: string;
  color: boolean;
  todos: Todo[];
  progress: number;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  count: 0,
  value1: "",
  color: false,
  todos: [],
  progress: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "toggleColor":
      return { ...state, color: !state.color };
    case "inputValue":
      return { ...state, value1: action.payload };
    case "add":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "delete":
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };
    case "update":
      return {
        ...state,
        todos: state.todos.map((todo: Todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case "toggleComplete":
      return {
        ...state,
        todos: state.todos.map((todo: Todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "setProgress":
      return { ...state, progress: action.payload };
    default:
      return state;
  }
}

const ModernTodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todoInput, setTodoInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddUpdate = () => {
    if (editingId !== null) {
      dispatch({
        type: "update",
        payload: { id: editingId, text: todoInput },
      });
      setEditingId(null);
    } else {
      if (todoInput.trim() !== "") {
        dispatch({ type: "add", payload: todoInput });
      }
    }
    setTodoInput("");
  };

  const handleEdit = (todo: Todo) => {
    setTodoInput(todo.text);
    setEditingId(todo.id);
  };

  useEffect(() => {
    if (state.todos.length > 0) {
      const completedCount = state.todos.filter((todo) => todo.completed).length;
      const newProgress = (completedCount / state.todos.length) * 100;
      dispatch({ type: "setProgress", payload: Math.round(newProgress) });
    } else {
      dispatch({ type: "setProgress", payload: 0 });
    }
  }, [state.todos]);

  const isDark = state.color;

  // 🆕 Set full screen background color
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const bg = isDark ? "#111827" : "#f9fafb";

    root.style.backgroundColor = bg;
    body.style.backgroundColor = bg;

    return () => {
      root.style.backgroundColor = "";
      body.style.backgroundColor = "";
    };
  }, [isDark]);

  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: isDark ? "#6b7280" : "#1f2937",
      borderRadius: 12,
      colorBgContainer: isDark ? "#374151" : "#ffffff",
      colorBgElevated: isDark ? "#374151" : "#ffffff",
      colorBgLayout: isDark ? "#111827" : "#f9fafb",
      colorText: isDark ? "#e5e7eb" : "#1f2937",
      colorTextSecondary: isDark ? "#9ca3af" : "#6b7280",
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Section */}
          <Card className={`shadow-sm ${isDark ? 'border-gray-700' : 'border-gray-100'}`} styles={{ body: { padding: '24px' } }}>
            <div className="flex items-center justify-between mb-3">
              <Text className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Progress</Text>
              <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{state.progress}%</Text>
            </div>
            <Progress
              percent={state.progress}
              showInfo={false}
              strokeColor={isDark ? '#9ca3af' : '#1f2937'}
              trailColor={isDark ? '#4b5563' : '#e5e7eb'}
            />
          </Card>

          {/* Counter Section */}
          <Card className={`shadow-sm ${isDark ? 'border-gray-700' : 'border-gray-100'}`} styles={{ body: { padding: '32px', textAlign: 'center' } }}>
            <Title level={2} className={`${isDark ? 'text-white' : 'text-gray-900'} !mb-6 !font-light`}>Count: {state.count}</Title>
            <Space size="large">
              <Button type="primary" shape="circle" size="large" onClick={() => dispatch({ type: "increment" })}
                className={`${isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-900 border-gray-900 hover:bg-gray-800'} w-12 h-12 text-xl`}>
                +
              </Button>
              <Button shape="circle" size="large" onClick={() => dispatch({ type: "decrement" })}
                className={`${isDark ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 border-gray-200 text-gray-700 hover:bg-gray-300'} w-12 h-12 text-xl`}>
                −
              </Button>
              <Button shape="circle" size="large" icon={<BgColorsOutlined />} onClick={() => dispatch({ type: "toggleColor" })}
                className={`${isDark ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 border-gray-100 text-gray-600 hover:bg-gray-200'} w-12 h-12`}>
              </Button>
            </Space>
          </Card>

          {/* Name Input Section */}
          <Card className={`shadow-sm ${isDark ? 'border-gray-700' : 'border-gray-100'}`} styles={{ body: { padding: '24px' } }}>
            <Title level={3} className={`${isDark ? 'text-white' : 'text-gray-900'} !mb-4`}>Name Input</Title>
            <Space direction="vertical" className="w-full" size="large">
              <Input
                placeholder="Enter your name..."
                value={state.value1}
                onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}
                size="large"
                className={`${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'}`}
              />
              {state.value1 && (
                <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Hello, {state.value1}!</Text>
              )}
            </Space>
          </Card>

          {/* Todo Manager Section */}
          <Card className={`shadow-sm ${isDark ? 'border-gray-700' : 'border-gray-100'}`} styles={{ body: { padding: '24px' } }}>
            <Title level={3} className={`${isDark ? 'text-white' : 'text-gray-900'} !mb-6`}>Todo Manager</Title>
            <Space direction="vertical" className="w-full" size="large">
              <Space.Compact className="w-full">
                <Input
                  placeholder="Enter your todo..."
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  onPressEnter={handleAddUpdate}
                  size="large"
                  className={`${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'}`}
                />
                <Button
                  type="primary"
                  size="large"
                  onClick={handleAddUpdate}
                  icon={editingId !== null ? <EditOutlined /> : <PlusOutlined />}
                  className={`${isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-900 border-gray-900 hover:bg-gray-800'}`}
                >
                  {editingId !== null ? "Update" : "Add"}
                </Button>
              </Space.Compact>

              {state.todos.length > 0 ? (
                <List
                  bordered
                  dataSource={state.todos}
                  className={`${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                  renderItem={(todo: Todo) => (
                    <List.Item
                      actions={[
                        <Button key="edit" type="text" icon={<EditOutlined />} onClick={() => handleEdit(todo)}
                          className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                          Edit
                        </Button>,
                        <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => dispatch({ type: "delete", payload: todo.id })}
                          className={`${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}>
                          Delete
                        </Button>,
                      ]}
                      className={`${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <Space>
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => dispatch({ type: "toggleComplete", payload: todo.id })}
                          className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        />
                        <Text className={`${todo.completed ? (isDark ? 'text-gray-500 line-through' : 'text-gray-400 line-through') : (isDark ? 'text-gray-200' : 'text-gray-700')}`}>
                          {todo.text}
                        </Text>
                      </Space>
                    </List.Item>
                  )}
                />
              ) : (
                <div className="text-center py-12">
                  <Text className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No todos yet. Add your first task!</Text>
                </div>
              )}
            </Space>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ModernTodoApp;






//--------------------------------------------------------



// import { useState, useReducer, useEffect } from "react";
// import {
//   Button,
//   Input,
//   List,
//   Space,
//   Card,
//   Progress,
//   Typography,
//   Checkbox,
//   ConfigProvider,
//   theme,
// } from "antd";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   BgColorsOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// interface State {
//   count: number;
//   value1: string;
//   color: boolean;
//   todos: Todo[];
//   progress: number;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// const initialState: State = {
//   count: 0,
//   value1: "",
//   color: false,
//   todos: [],
//   progress: 0,
// };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "increment":
//       return { ...state, count: state.count + 1 };
//     case "decrement":
//       return { ...state, count: state.count - 1 };
//     case "toggleColor":
//       return { ...state, color: !state.color };
//     case "inputValue":
//       return { ...state, value1: action.payload };
//     case "add":
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           { id: Date.now(), text: action.payload, completed: false },
//         ],
//       };
//     case "delete":
//       return {
//         ...state,
//         todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
//       };
//     case "update":
//       return {
//         ...state,
//         todos: state.todos.map((todo: Todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, text: action.payload.text }
//             : todo
//         ),
//       };
//     case "toggleComplete":
//       return {
//         ...state,
//         todos: state.todos.map((todo: Todo) =>
//           todo.id === action.payload
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         ),
//       };
//     case "setProgress":
//       return { ...state, progress: action.payload };
//     default:
//       return state;
//   }
// }

// const Reducer = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [todoInput, setTodoInput] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const handleAddUpdate = () => {
//     if (editingId !== null) {
//       dispatch({
//         type: "update",
//         payload: { id: editingId, text: todoInput },
//       });
//       setEditingId(null);
//     } else {
//       if (todoInput.trim() !== "") {
//         dispatch({ type: "add", payload: todoInput });
//       }
//     }
//     setTodoInput("");
//   };

//   const handleEdit = (todo: Todo) => {
//     setTodoInput(todo.text);
//     setEditingId(todo.id);
//   };

//   useEffect(() => {
//     if (state.todos.length > 0) {
//       const completedCount = state.todos.filter((todo) => todo.completed).length;
//       const newProgress = (completedCount / state.todos.length) * 100;
//       dispatch({ type: "setProgress", payload: Math.round(newProgress) });
//     } else {
//       dispatch({ type: "setProgress", payload: 0 });
//     }
//   }, [state.todos]);

//   const isDark = state.color;

//   // Theme configuration for Ant Design
//   const themeConfig = {
//     algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
//     token: {
//       colorPrimary: isDark ? "#6b7280" : "#1f2937",
//       borderRadius: 12,
//       colorBgContainer: isDark ? "#374151" : "#ffffff",
//       colorBgElevated: isDark ? "#374151" : "#ffffff",
//       colorBgLayout: isDark ? "#111827" : "#f9fafb",
//       colorText: isDark ? "#e5e7eb" : "#1f2937",
//       colorTextSecondary: isDark ? "#9ca3af" : "#6b7280",
//       colorTextBase: isDark ? "#e5e7eb" : "#1f2937",
//       colorBgBase: isDark ? "#111827" : "#f9fafb",
//     },
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       isDark ? 'bg-gray-900' : 'bg-gray-50'
//     }`}>
//       <ConfigProvider theme={themeConfig}>
//         <div className="py-8 px-4">
//         <div className="max-w-2xl mx-auto space-y-6">
//           {/* Progress Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '24px' }
//             }}
//           >
//             <div className="flex items-center justify-between mb-3">
//               <Text className={`text-sm font-medium ${
//                 isDark ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Progress
//               </Text>
//               <Text className={`text-sm ${
//                 isDark ? 'text-gray-400' : 'text-gray-500'
//               }`}>
//                 {state.progress}%
//               </Text>
//             </div>
//             <Progress
//               percent={state.progress}
//               showInfo={false}
//               strokeColor={isDark ? '#9ca3af' : '#1f2937'}
//               trailColor={isDark ? '#4b5563' : '#e5e7eb'}
//               className="transition-colors duration-300"
//             />
//           </Card>

//           {/* Counter Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '32px', textAlign: 'center' }
//             }}
//           >
//             <Title 
//               level={2} 
//               className={`!mb-6 !font-light transition-colors duration-300 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}
//             >
//               Count: {state.count}
//             </Title>
//             <Space size="large">
//               <Button
//                 type="primary"
//                 shape="circle"
//                 size="large"
//                 onClick={() => dispatch({ type: "increment" })}
//                 className={`w-12 h-12 flex items-center justify-center text-xl font-light transition-colors duration-200 ${
//                   isDark 
//                     ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
//                     : 'bg-gray-900 border-gray-900 hover:bg-gray-800'
//                 }`}
//               >
//                 +
//               </Button>
//               <Button
//                 shape="circle"
//                 size="large"
//                 onClick={() => dispatch({ type: "decrement" })}
//                 className={`w-12 h-12 flex items-center justify-center text-xl font-light transition-colors duration-200 ${
//                   isDark 
//                     ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' 
//                     : 'bg-gray-200 border-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 −
//               </Button>
//               <Button
//                 shape="circle"
//                 size="large"
//                 icon={<BgColorsOutlined />}
//                 onClick={() => dispatch({ type: "toggleColor" })}
//                 className={`w-12 h-12 flex items-center justify-center transition-colors duration-200 ${
//                   isDark 
//                     ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
//                     : 'bg-gray-100 border-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               />
//             </Space>
//           </Card>

//           {/* Name Input Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '24px' }
//             }}
//           >
//             <Title 
//               level={3} 
//               className={`!mb-4 transition-colors duration-300 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}
//             >
//               Name Input
//             </Title>
//             <Space direction="vertical" className="w-full" size="large">
//               <Input
//                 placeholder="Enter your name..."
//                 value={state.value1}
//                 onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}
//                 size="large"
//                 className={`transition-all duration-200 ${
//                   isDark 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
//                     : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'
//                 }`}
//               />
//               {state.value1 && (
//                 <Text className={`transition-colors duration-300 ${
//                   isDark ? 'text-gray-300' : 'text-gray-600'
//                 }`}>
//                   Hello, {state.value1}!
//                 </Text>
//               )}
//             </Space>
//           </Card>

//           {/* Todo Manager Section */}
//           <Card 
//             className={`shadow-sm transition-colors duration-300 ${
//               isDark ? 'border-gray-700' : 'border-gray-100'
//             }`}
//             styles={{
//               body: { padding: '24px' }
//             }}
//           >
//             <Title 
//               level={3} 
//               className={`!mb-6 transition-colors duration-300 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}
//             >
//               Todo Manager
//             </Title>
            
//             <Space direction="vertical" className="w-full" size="large">
//               <Space.Compact className="w-full">
//                 <Input
//                   placeholder="Enter your todo..."
//                   value={todoInput}
//                   onChange={(e) => setTodoInput(e.target.value)}
//                   onPressEnter={handleAddUpdate}
//                   size="large"
//                   className={`transition-all duration-200 ${
//                     isDark 
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
//                       : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'
//                   }`}
//                 />
//                 <Button
//                   type="primary"
//                   size="large"
//                   onClick={handleAddUpdate}
//                   icon={editingId !== null ? <EditOutlined /> : <PlusOutlined />}
//                   className={`transition-colors duration-200 ${
//                     isDark 
//                       ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
//                       : 'bg-gray-900 border-gray-900 hover:bg-gray-800'
//                   }`}
//                 >
//                   {editingId !== null ? "Update" : "Add"}
//                 </Button>
//               </Space.Compact>

//               {state.todos.length > 0 ? (
//                 <List
//                   bordered
//                   dataSource={state.todos}
//                   className={`transition-colors duration-300 ${
//                     isDark ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                   renderItem={(todo: Todo) => (
//                     <List.Item
//                       actions={[
//                         <Button
//                           key="edit"
//                           type="text"
//                           icon={<EditOutlined />}
//                           onClick={() => handleEdit(todo)}
//                           className={`transition-colors duration-200 ${
//                             isDark 
//                               ? 'text-gray-400 hover:text-gray-200' 
//                               : 'text-gray-500 hover:text-gray-700'
//                           }`}
//                         >
//                           Edit
//                         </Button>,
//                         <Button
//                           key="delete"
//                           type="text"
//                           danger
//                           icon={<DeleteOutlined />}
//                           onClick={() => dispatch({ type: "delete", payload: todo.id })}
//                           className={`transition-colors duration-200 ${
//                             isDark 
//                               ? 'text-gray-400 hover:text-red-400' 
//                               : 'text-gray-500 hover:text-red-500'
//                           }`}
//                         >
//                           Delete
//                         </Button>,
//                       ]}
//                       className={`transition-colors duration-300 ${
//                         isDark 
//                           ? 'border-gray-700 hover:bg-gray-800' 
//                           : 'border-gray-100 hover:bg-gray-50'
//                       }`}
//                     >
//                       <Space>
//                         <Checkbox
//                           checked={todo.completed}
//                           onChange={() => dispatch({ type: "toggleComplete", payload: todo.id })}
//                           className={`transition-colors duration-200 ${
//                             isDark ? 'text-gray-300' : 'text-gray-700'
//                           }`}
//                         />
//                         <Text
//                           className={`transition-colors duration-200 ${
//                             todo.completed 
//                               ? isDark ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
//                               : isDark ? 'text-gray-200' : 'text-gray-700'
//                           }`}
//                         >
//                           {todo.text}
//                         </Text>
//                       </Space>
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <div className="text-center py-12">
//                   <Text className={`transition-colors duration-300 ${
//                     isDark ? 'text-gray-500' : 'text-gray-400'
//                   }`}>
//                     No todos yet. Add your first task!
//                   </Text>
//                 </div>
//               )}
//             </Space>
//           </Card>
//         </div>
//       </ConfigProvider>
//     </div>
//   );
// };

// export default Reducer;




//-------------------------------------------------


// import { useState, useReducer, useEffect } from "react";
// import {
//   Button,
//   Input,
//   List,
//   Space,
//   Card,
//   Progress,
//   Typography,
//   Checkbox,
// } from "antd";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   BgColorsOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// interface State {
//   count: number;
//   value1: string;
//   color: boolean;
//   todos: Todo[];
//   progress: number;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// const initialState: State = {
//   count: 0,
//   value1: "",
//   color: false,
//   todos: [],
//   progress: 0,
// };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "increment":
//       return { ...state, count: state.count + 1 };
//     case "decrement":
//       return { ...state, count: state.count - 1 };
//     case "toggleColor":
//       return { ...state, color: !state.color };
//     case "inputValue":
//       return { ...state, value1: action.payload };
//     case "add":
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           { id: Date.now(), text: action.payload, completed: false },
//         ],
//       };
//     case "delete":
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.payload),
//       };
//     case "update":
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, text: action.payload.text }
//             : todo
//         ),
//       };
//     case "toggleComplete":
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         ),
//       };
//     case "setProgress":
//       return { ...state, progress: action.payload };
//     default:
//       return state;
//   }
// }

// const Reducer = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [todoInput, setTodoInput] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const handleAddUpdate = () => {
//     if (editingId !== null) {
//       dispatch({
//         type: "update",
//         payload: { id: editingId, text: todoInput },
//       });
//       setEditingId(null);
//     } else {
//       if (todoInput.trim() !== "") {
//         dispatch({ type: "add", payload: todoInput });
//       }
//     }
//     setTodoInput("");
//   };

//   const handleEdit = (todo: Todo) => {
//     setTodoInput(todo.text);
//     setEditingId(todo.id);
//   };

//   useEffect(() => {
//     if (state.todos.length > 0) {
//       const completedCount = state.todos.filter((todo) => todo.completed).length;
//       const newProgress = (completedCount / state.todos.length) * 100;
//       dispatch({ type: "setProgress", payload: Math.round(newProgress) });
//     } else {
//       dispatch({ type: "setProgress", payload: 0 });
//     }
//   }, [state.todos]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//         {/* Progress */}
//         <Card>
//           <Text strong>Progress</Text>
//           <Progress percent={state.progress} />
//         </Card>

//         {/* Counter */}
//         <Card style={{ marginTop: 16 }}>
//           <Title level={2}>Count: {state.count}</Title>
//           <Space>
//             <Button type="primary" onClick={() => dispatch({ type: "increment" })}>
//               +
//             </Button>
//             <Button danger onClick={() => dispatch({ type: "decrement" })}>
//               -
//             </Button>
//             <Button
//               icon={<BgColorsOutlined />}
//               onClick={() => dispatch({ type: "toggleColor" })}
//             >
//               Toggle Color
//             </Button>
//           </Space>
//         </Card>

//         {/* Name Input */}
//         <Card style={{ marginTop: 16 }}>
//           <Title level={3}>Name Input</Title>
//           <Input
//             placeholder="Enter your name..."
//             value={state.value1}
//             onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}
//           />
//           {state.value1 && <Text>Hello, {state.value1}!</Text>}
//         </Card>

//         {/* Todo List */}
//         <Card style={{ marginTop: 16 }}>
//           <Title level={3}>Todo Manager</Title>
//           <Space.Compact style={{ width: "100%" }}>
//             <Input
//               placeholder="Enter your todo..."
//               value={todoInput}
//               onChange={(e) => setTodoInput(e.target.value)}
//               onPressEnter={handleAddUpdate}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUpdate}
//               icon={editingId !== null ? <EditOutlined /> : <PlusOutlined />}
//             >
//               {editingId !== null ? "Update" : "Add"}
//             </Button>
//           </Space.Compact>

//           {state.todos.length > 0 ? (
//             <List
//               bordered
//               dataSource={state.todos}
//               renderItem={(todo) => (
//                 <List.Item
//                   actions={[
//                     <Button
//                       key="edit"
//                       type="text"
//                       icon={<EditOutlined />}
//                       onClick={() => handleEdit(todo)}
//                     >
//                       Edit
//                     </Button>,
//                     <Button
//                       key="delete"
//                       type="text"
//                       danger
//                       icon={<DeleteOutlined />}
//                       onClick={() =>
//                         dispatch({ type: "delete", payload: todo.id })
//                       }
//                     >
//                       Delete
//                     </Button>,
//                   ]}
//                 >
//                   <Space>
//                     <Checkbox
//                       checked={todo.completed}
//                       onChange={() =>
//                         dispatch({ type: "toggleComplete", payload: todo.id })
//                       }
//                     />
//                     <Text delete={todo.completed}>{todo.text}</Text>
//                   </Space>
//                 </List.Item>
//               )}
//             />
//           ) : (
//             <Text>No todos yet. Add your first task!</Text>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Reducer;
