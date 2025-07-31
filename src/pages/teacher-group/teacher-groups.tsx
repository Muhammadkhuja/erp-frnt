import { useTeacher } from "@hooks";

const TeacherGroups = () => {
  const { data } = useTeacher();
  console.log(data);
  return (
    <div>
      <h1>Helllo uzbbbbbbbbbbb</h1>
    </div>
  );
};

export default TeacherGroups;
