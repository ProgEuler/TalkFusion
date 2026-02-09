import { useGetCompanyQuery } from '@/api/user-api/company.api';
import AddServices from '@/components/add-services';
import CompanyUpdateForm from '@/components/company-update-form';
import ImportAiFiles from '@/components/import-ai-files';
import { Layout } from '@/components/layout/Layout';
import React from 'react';
import { toast } from 'sonner-native';

export default function AIAssistantScreen() {
  const { data: company } = useGetCompanyQuery({});

  const handleSuccess = () => {
    toast.success('Company information updated successfully');
  };

  return (
    <Layout>
      <CompanyUpdateForm
        onSuccess={handleSuccess}
        defaultValues={company}
      />

      <AddServices />

      <ImportAiFiles />
    </Layout>
  );
}
