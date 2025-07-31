// import { useParams } from "react-router-dom"
// import { useTeacher } from "@hooks"
// import { Button, Table } from "antd"
// import { Switch } from 'antd';
// import { useEffect, useState } from "react";
// const TeacherGroup = () => {
//   const [students,setStudents] = useState([])
//   const {id} = useParams()
//   const {students:data} = useTeacher(Number(id))
//   useEffect(()=>{
//     const new_arr = data?.data?.groupStudents?.map((item:any) => {
//       return {
//         studentId: item.student.id,
//         status: true,
//         full_name: item?.student.first_name + " " + item?.student.last_name
//       }
//     })
//     setStudents(new_arr)
//     console.log(new_arr);
//   },[id, data?.data?.data.groupStudents])
//   const handleChange =(id:number)=>{
//    students.forEach((item:any)=>{
//     if(item.studentId === id){
//       item.status = !item.status
//     }
//    })
//   }
//   const submit =()=>{
//     console.log(students, 'students')
//     console.log("info", data);
//     console.log("info1", data?.data?.groupStudents);
//     console.log("info2", data?.data);
//     console.log("info3", data?.data?.data);
//     console.log("info3", data?.data?.data);
//   }
//       const columns = [
//     {
//       title: "Full name",
//       key: "full_name",
//        dataIndex: "full_name",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: any) => (
//           <Switch defaultChecked onChange={()=>handleChange(record.studentId)} />
//       ),
//     },
//   ];
//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={students}
//         rowKey={(row) => row.studentId!}
//       />
//       <Button type="primary" onClick={submit}>submit</Button>
//     </div>
//   )
// }

// export default TeacherGroup







// import { useParams } from "react-router-dom";
// import { useTeacher } from "@hooks";
// import { Button, Table, Switch } from "antd";
// import { useEffect, useState } from "react";

// const TeacherGroup = () => {
//   const [students, setStudents] = useState<any[]>([]);
//   const { id } = useParams();
//   const { data } = useTeacher(Number(id)); // <-- TO‘G‘RILANDI

//   useEffect(() => {
//     if (data?.data?.groupStudents) {
//       const new_arr = data.data.groupStudents.map((item: any) => ({
//         studentId: item.student.id,
//         status: true,
//         full_name: `${item.student.first_name} ${item.student.last_name}`,
//       }));
//       setStudents(new_arr);
//       console.log("new_arr", new_arr);
//     }
//   }, [data]);

//   const handleChange = (id: number) => {
//     setStudents((prev) =>
//       prev.map((item) =>
//         item.studentId === id ? { ...item, status: !item.status } : item
//       )
//     );
//   };

//   const submit = () => {
//     console.log("students", students);
//     console.log("info", data?.data.data);
//     console.log("info1", data?.data?.groupStudents);
//   };

//   const columns = [
//     {
//       title: "Full name",
//       key: "full_name",
//       dataIndex: "full_name",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: any) => (
//         <Switch
//           checked={record.status}
//           onChange={() => handleChange(record.studentId)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={students}
//         rowKey={(row) => row.studentId}
//       />
//       <Button type="primary" onClick={submit}>
//         submit
//       </Button>
//     </div>
//   );
// };

// export default TeacherGroup;






import { useParams } from "react-router-dom";
import { useTeacher } from "@hooks";
import { Button, Table, Switch } from "antd";
import { useEffect, useState } from "react";

const TeacherGroup = () => {
  const [students, setStudents] = useState<
    { studentId: number; status: boolean; full_name: string }[]
  >([]);

  const { id } = useParams();
  const { data } = useTeacher(Number(id));

  useEffect(() => {
    const groupStudents = data?.data?.data?.groupStudents;
    if (groupStudents) {
      const new_arr = groupStudents.map((item: any) => ({
        studentId: item.student.id,
        status: true,
        full_name: `${item.student.first_name} ${item.student.last_name}`,
      }));
      setStudents(new_arr);
      console.log("new_arr", new_arr);
    }
  }, [data]);

  const handleChange = (id: number) => {
    setStudents((prev) =>
      prev.map((item) =>
        item.studentId === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const submit = () => {
    console.log("students", students); // Yangi status bilan studentlar
    console.log("teacher full data", data?.data?.data);
    console.log("groupStudents", data?.data?.data?.groupStudents);
  };

  const columns = [
    {
      title: "Full name",
      key: "full_name",
      dataIndex: "full_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Switch
          checked={record.status}
          onChange={() => handleChange(record.studentId)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={students}
        rowKey={(row) => row.studentId}
        pagination={false}
      />
      <Button type="primary" onClick={submit} style={{ marginTop: 16 }}>
        Submit
      </Button>
    </div>
  );
};

export default TeacherGroup;
