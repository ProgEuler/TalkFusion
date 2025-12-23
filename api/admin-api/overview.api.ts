import { baseApi } from "../baseApi";

interface SocialChannel {
  id: number;
  status: string;
  last_used: string | null;
  messages_today: number;
}

interface Company {
  id: number;
  name: string;
  status_message: string;
  whatsapp: SocialChannel | null;
  facebook: SocialChannel | null;
  instagram: SocialChannel | null;
}

export interface OverviewResponse {
  total_channels: number[];
  online_channels: number[];
  offline_channels: number[];
  warning_channels: number[];
  companies: Company[];
}

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewResponse, void>({
      query: () => "/admin/company-overview/",
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
export type { Company, SocialChannel };
