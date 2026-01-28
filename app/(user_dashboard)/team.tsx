import UpdateRoleModal from "@/components/employee-modal";
import Employees, { Employee } from "@/components/employees";
import { Layout } from "@/components/layout/Layout";
import React, { useState } from "react";
import { View } from "react-native";
import RBACTable from "./rbac-table";
import AddEmployee from "@/components/user-components/add-employee";

const TeamPermissionsPage = () => {
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

   const handleEmployeePress = (employee: Employee) => {
      setSelectedEmployee(employee);
      setModalVisible(true);
   };

  return (
    <Layout>
      <View>
         <AddEmployee />
         <UpdateRoleModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            employee={selectedEmployee}
         />

         <Employees onEmployeePress={handleEmployeePress} />

        <RBACTable />
      </View>
    </Layout>
  );
};

export default TeamPermissionsPage;
