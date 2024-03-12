import { CustomerAccount, GeneralStations } from "common/AdminModel";
import { Station, User } from "common/model";
import api from "./axios";

const API_URL = "/customerAccount";
type StationSearchCriteria = {
  customerAccountId: string;
  name?: string;
  creator?: string;
  parent?: string;
};

export const getStationForUser = async (username: string, user: User) => {
  const response = await api.get(
    `${API_URL}/${user.customerAccountId}/station?userLogin=${username}`,
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    },
  );

  return response.data;
};

export const getStations = async (user: User) => {
  return await getStationForUser(user.username, user);
};

export const createStation = async (station: Station, user: User) => {
  const { name, address, controllerPts, country } = station;

  const response = await api.post(`${API_URL}/add`, {
    name,
    address,
    controllerPts,
    country,
    userLogin: user.username,
  });

  return response.data;
};

export const updateStation = async (
  customerAccountId: string | undefined,
  station: GeneralStations,
) => {
  const response = await api.put(
    `${API_URL}/${customerAccountId}/station/update`,
    station,
  );
  return response.data;
};

export const deleteStation = async (station: Station) => {
  const response = await api.delete(`${API_URL}/delete/${station.id}`);

  return response.data;
};

export const allStationByCustomerAccount = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/station`);

  return response.data;
};
export const allUserByCustomerAccount = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/user`);

  return response.data;
};
export const getCustomerAccountInformation = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/info`);

  return response.data;
};
export const listStation = async (
  stationSearchCriteria: StationSearchCriteria = {
    customerAccountId: "",
  },
  page: number,
  size: number,
): Promise<{
  content: GeneralStations[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
}> => {
  let url = `${API_URL}/${stationSearchCriteria.customerAccountId}/station`;

  const { name, creator, parent } = stationSearchCriteria;

  const searchParams = new URLSearchParams();

  if (name || parent || creator) {
    url += "/filter";
  } else {
    url;
  }

  if (name) {
    searchParams.append("name", name);
  }

  if (creator) {
    searchParams.append("creator", creator);
  }

  if (parent) {
    searchParams.append("parent", parent);
  }
  searchParams.append("page", page.toString());
  searchParams.append("size", size.toString());

  const response = await api.get(url + "?" + searchParams.toString());

  return response.data;
};

export const listOfCreator = async (
  customerAccountId: string | undefined,
): Promise<CustomerAccount[]> => {
  const response = await api.get(`${API_URL}/${customerAccountId}/creator`);
  return response.data;
};

export const activateStation = async (
  customerAccountId: string,
  stationdId: string,
) => {
  const response = await api.put(
    `${API_URL}/${customerAccountId}/station/activate/${stationdId}`,
  );

  return response.data;
};

export const deactivateStation = async (
  customerAccountId: string,
  stationId: string,
) => {
  const response = await api.put(
    `${API_URL}/${customerAccountId}/station/deactivate/${stationId}`,
  );
  return response.data;
};
export const stationInformation = async (
  stationId: number | string,
  customerAccountId: undefined | string,
): Promise<GeneralStations> => {
  const response = await api.get(
    `${API_URL}/${customerAccountId}/station/${stationId}/info`,
  );
  return response.data;
};
