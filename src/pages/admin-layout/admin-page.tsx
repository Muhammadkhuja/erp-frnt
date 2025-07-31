import { Descriptions } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@hooks";
function AdminProfile() {
  const { data } = useAdmin();
  const admin = data?.data;
  return (
    <div style={{ padding: 24 }}>
      {" "}
      <h1>Admin Profili</h1> <h3>Shaxsiy Ma'lumotlar</h3>{" "}
      <Descriptions column={1} bordered>
        {" "}
        <Descriptions.Item label="Ism">
          {" "}
          {admin?.first_name} {admin?.last_name}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Email"> {admin?.email} </Descriptions.Item>{" "}
        <Descriptions.Item label="Telefon"> {admin?.phone} </Descriptions.Item>{" "}
        <Descriptions.Item label="Status">
          {" "}
          {admin?.is_active ? "Faol" : "Nofaol"}{" "}
        </Descriptions.Item>{" "}
      </Descriptions>{" "}
      <h3 style={{ marginTop: 24 }}>Hisob Ma'lumotlari</h3>{" "}
      <Descriptions column={1} bordered>
        {" "}
        <Descriptions.Item label="Ro'yxatdan o'tgan vaqt">
          {" "}
          {dayjs(admin?.created_at).format("DD.MM.YYYY, HH:mm")}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Oxirgi yangilangan">
          {" "}
          {dayjs(admin?.updated_at).format("DD.MM.YYYY, HH:mm")}{" "}
        </Descriptions.Item>{" "}
      </Descriptions>{" "}
    </div>
  );
}
export default AdminProfile;
