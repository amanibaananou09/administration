import { Filter, Station } from "common/model";
import api from "./axios";

const API_URL = "/data";

export const getChartByFuelPumpPeriod = async (
  station: Station,
  filter: Filter,
  periode: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/sales/${station.controllerPts.id}?chartType=${filter.chartType}&fuel=${filter.fuelGrade}&pump=${filter.pump}&periode=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};

export const getChartByFuelTankPeriod = async (
  controllerId: string,
  fuelGrade: string,
  tank: string,
  period: string,
) => {
  const response = await api.get(
    `${API_URL}/deliveries/${fuelGrade}/${tank}/${period}/${controllerId}`,
  );

  return response.data;
};

export const getAllStatVent = async (
  station: Station,
  periode: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/salesByUser/${station.controllerPts.id}?periode=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};

export const getAllTankByIdc = async (station: Station) => {
  const response = await api.get(
    `${API_URL}/allTankByIdC/${station.controllerPts.id}`,
  );

  return response.data;
};

export const getTankMeasurementByPeriod = async (
  station: Station,
  tank: string |number,
  periode: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/tankMeasurementByPeriod/${station.controllerPts.id}?tank=${tank}&periode=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};

export const getTankLevelByPeriod = async (
  station: Station,
  tank: string | number,
  periode: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/tankLevelByPeriod/${station.controllerPts.id}?tank=${tank}&periode=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};
