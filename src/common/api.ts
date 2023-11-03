import { Station, User,Filter } from "./model";

export const localhostURL = "http://localhost:8083";
export const webSocketURL = "ws://localhost:8083";
//get ptsId
const PtsId = localStorage.getItem("PtsId");

//controller
export const ALL_CONTROLLERS_ENDPOINT = `${localhostURL}/api/station/allContoller`;
export const ADD_CONTROLLERS_ENDPOINT = `${localhostURL}/api/station/addController`;

//Grades
export const FUELGRADES_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/fuelGrade`;

//Web_socket
export const CONFIG_WEBSOCKET_ENDPOINT = `${localhostURL}/api/configuration/ws/${PtsId}`;

//History Endpoint
export const HISTORY_USER_ENDPOINT = `${localhostURL}/api/userHistory`;

//UserHistory
export const HISTORY_USER_GETID = `${localhostURL}/api/getTranById`;

//login
export const LOGIN_ENDPOINT = `${localhostURL}/api/login`;
//User
export const CREATE_USER_ENDPOINT = `${localhostURL}/api/createUser`;
export const LIST_USERS_ENDPOINT = `${localhostURL}/api/listUsers`;

//version
export const VERSION_CONFIG_ENDPOINT = `${localhostURL}/api/configuration/version`;

//Nozzles
export const NOZZLES_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/nozzle`;
export const NOZZEL_BY_PUMP_READ_ENDPOINT = `${localhostURL}/api/configuration/nozzleByPump`;

//Pump
export const PUMP_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/pump`;
export const PUMP_ALL_TRANSACTION_READ_CONFIG = `${localhostURL}/api/configuration/transaction`;
export const PUMP_UPLOAD_TRANSACTION = `${localhostURL}/api/PumpTransaction`;

//Tank
export const TANK_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/tank`;
export const TANK_CONFIG_READ_DELIVERY_ENDPOINT = `${localhostURL}/api/configuration/delivery`;
export const TANK_MEASURMENT_STAT = `${localhostURL}/api/stat/tank`;
export const TANK_LAST_DELIVERY = `${localhostURL}/api/stat/lastDelivery`;
//Probe
export const PROBE_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/probe`;

//Reader
export const READER_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/reader`;

//Station
export const STATION_ADD_ENDPOINT = `${localhostURL}/api/station/add`;
export const STATION_UPDATE_ENDPOINT = `${localhostURL}/api/station/update`;
export const STATION_DELETE_ENDPOINT = `${localhostURL}/api/station/delete`;
export const STATION_ALL_ENDPOINT = `${localhostURL}/api/administration`;
export const FIND_CONTROLLER_BY_STATION_ENDPOINT = `${localhostURL}/api/station/findController`;

//chart
export const CHART_ENDPOINT = `${localhostURL}/api/data/sales`;
export const CHART_TANK_ENDPOINT = `${localhostURL}/api/data/deliveries`;
export const CHART_STAT_VENT_ENDPOINT = `${localhostURL}/api/data/salesByUser`;
export const CHART_TANK_ALL_BY_IDC = `${localhostURL}/api/data/allTankByIdC`;
export const CHART_TANK_Measurement_BY_PERIOD = `${localhostURL}/api/data/tankMeasurementByPeriod`;
export const CHART_TANK_LEVEL_BY_PERIOD = `${localhostURL}/api/data/tankLevelByPeriod`;

//statistique
export const ALL_SALES_BY_GRADES = `${localhostURL}/api/stat/sales/fuelName`;
export const ALL_SALES_BY_PUMP = `${localhostURL}/api/stat/sales`;
export const ALL_SALES_BY_PUMP_AND_GRADE = `${localhostURL}/api/stat/salesByGrades`;


export const fetchUrl = async (config: { url: string; method?: string; headers: Record<string, string>; body?: Record<string, any>; withCredentials?: boolean; crossorigin?: boolean; mode?: string; }) => {
  const response = await fetch(config.url, {
    method: config.method ? config.method : "GET",
    headers: config.headers,
    body: config.body ? JSON.stringify(config.body) : null,
  });

  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error("body is not a json format");
    data = null;
  }

  return data;
};

export const setFuelGradesConfiguration = async (fuelGrades: string, token: string) => {
  const body = {
    Protocol: "jsonPTS",
    Packets: [
      {
        Id: 1,
        Type: "SetFuelGradesConfiguration",
        Data: {
          FuelGrades: fuelGrades,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const getAllFuelGrades = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${FUELGRADES_CONFIG_READ_ALL_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};
export const getAllReader = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${READER_CONFIG_READ_ALL_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};
export const getAllNozzle = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${NOZZLES_CONFIG_READ_ALL_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};
export const getAllPump = async ( station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${PUMP_CONFIG_READ_ALL_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};
export const getAllTank = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${TANK_CONFIG_READ_ALL_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getListUser = async (user: User) => {
  const data = await fetchUrl({
    url: LIST_USERS_ENDPOINT,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getAllProb = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${PROBE_CONFIG_READ_ALL_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};
export const setPumpNozzlesConfiguration = async (pumpNozzles: string, token: string) => {
  // Create the body object with the Port and Probe data variables
  const body = {
    Protocol: "jsonPTS",
    Packets: [
      {
        Id: 1,
        Type: "SetPumpNozzlesConfiguration",
        Data: {
          PumpNozzles: pumpNozzles,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const setProbesConfiguration = async (ports: number, probes: number, user: User) => {
  const body = {
    Protocol: "jsonPTS",
    Packets: [
      {
        Id: 1,
        Type: "SetProbesConfiguration",
        Data: {
          Ports: ports,
          Probes: probes,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body,
  });

  return data;
};

export const setPumpsConfiguration = async (ports: number, pumps: string, user: User) => {
  // Create the body object with the Port and Probe data variables
  const body = {
    Protocol: "jsonPTS",
    Packets: [
      {
        Id: 1,
        Type: "SetPumpsConfiguration",
        Data: {
          Ports: ports,
          Pumps: pumps,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body,
  });

  return data;
};

export const sendPumpAuthorize = async (pump: string, nozzle: string, type: string, dose: number, user: User) => {
  const body = {
    Protocol: "jsonPTS",
    PtsId: PtsId,
    Packets: [
      {
        Id: 1,
        Type: "PumpAuthorize",
        Data: {
          Pump: pump,
          Nozzle: nozzle,
          Type: type,
          Dose: dose,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body,
  });

  return data;
};

export const setReadersConfiguration = async (ports: number, readers: string, user: User) => {
  // Create the body object with the Port and Probe data variables
  const body = {
    Protocol: "jsonPTS",
    Packets: [
      {
        Id: 1,
        Type: "SetReadersConfiguration",
        Data: {
          Ports: ports,
          Readers: readers,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body,
  });

  return data;
};

export const setTanksConfiguration = async (tank: string, user: User) => {
  var body = {
    Protocol: "jsonPTS",
    PtsId: PtsId,
    Packets: [
      {
        Id: 1,
        Type: "SetTanksConfiguration",
        Data: {
          Tanks: tank,
        },
      },
    ],
  };

  const data = await fetchUrl({
    url: CONFIG_WEBSOCKET_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body,
  });

  return data;
};


export const login = async (username: string, password: string) => {
  const data = await fetchUrl({
    url: LOGIN_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      username,
      password,
    },
  });

  return data;
};

export const getUserHistory = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${HISTORY_USER_ENDPOINT}/${station.controllerPts.id}/Action`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const consultUserHistory = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${HISTORY_USER_ENDPOINT}/${station.controllerPts.id}/Consult`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
}

export const getPumpAuthorizeforhistoryUser = async (station: Station , user: User) => {
  const data = await fetchUrl({
    url: `${HISTORY_USER_ENDPOINT}/${station.controllerPts.id}/PumpAuthorize`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getIdUserHistory = async (idAction: number, token: string) => {
  const data = await fetchUrl({
    url: `${HISTORY_USER_GETID}/${idAction}`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getAllPumpByNozzel = async (station: Station, selectedPump: string, user: User) => {
  const data = await fetchUrl({
    url: `${NOZZEL_BY_PUMP_READ_ENDPOINT}/${station.controllerPts.id}/${selectedPump}`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getallTransactionPump = async (
  currentPage: number,
 station:Station,
  token: string,
  filterType: string,
  pumpId: number,
  fuelGrade: number,
  startDate: string,
  endDate: string
) => {
  const data = await fetchUrl({
    url: `${PUMP_ALL_TRANSACTION_READ_CONFIG}/${station.controllerPts.id}?filterType=${filterType}&pumpId=${pumpId}&fuelGrade=${fuelGrade}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getUploadTransactionPump = async (user: User) => {
  const data = await fetchUrl({
    url: PUMP_UPLOAD_TRANSACTION,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const createStation = async (station: Station, user: User ) => {
  const { name, address, controllerPts, country } = station;

  const data = await fetchUrl({
    url: STATION_ADD_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: {
      name,
      address,
      controllerPts,
      country,
      userLogin: user.username,
    },
  });

  return data;
};

export const updateStation = async (station: Station, user: User ) => {
  const { name, address, controllerPts, country } = station;

  const data = await fetchUrl({
    url: `${STATION_UPDATE_ENDPOINT}/${station.id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: {
      name,
      address,
      controllerPts,
      country,
      userLogin: user.username,
    },
  });

  return data;
};

export const deleteStation = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${STATION_DELETE_ENDPOINT}/${station.id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getStationForUser = async (username: string, token: string) => {
  const data = await fetchUrl({
    url: `${STATION_ALL_ENDPOINT}/${username}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getStations = async (user: User | null) => {
  return await getStationForUser(user!.username, user!.token);
};

export const findControllerByStation = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${FIND_CONTROLLER_BY_STATION_ENDPOINT}/${station.name}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const createUserStation = async (user : User) => {
  const {family_name, given_name, username, email,role}= user;
  const data = await fetchUrl({
    url: CREATE_USER_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: {
      family_name,
      given_name,
      username,
      email,
      role,
    },
  });

  return data;
};

export const getAllStatVent = async (station:Station , user: User) => {
  const data = await fetchUrl({
    url: `${CHART_STAT_VENT_ENDPOINT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getAllTankByIdc = async (station:Station, user: User) => {
  const data = await fetchUrl({
    url: `${CHART_TANK_ALL_BY_IDC}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getTankMeasurementByPeriod = async (station: Station, user: User, tank : string, periode : string) => {
  const data = await fetchUrl({
    url: `${CHART_TANK_Measurement_BY_PERIOD}/${station.controllerPts.id}?tank=${tank}&periode=${periode}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getTankLevelByPeriod = async (user: User, station: Station,tank : string, periode : string) => {
  const data = await fetchUrl({
    url: `${CHART_TANK_LEVEL_BY_PERIOD}/${station.controllerPts.id}?tank=${tank}&periode=${periode}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getChartByFuelPumpPeriod = async (
  station: Station,
  filter:Filter,
  periode: string,
  user: User,
) => {
  const data = await fetchUrl({
    url: `${CHART_ENDPOINT}/${station.controllerPts.id}?chartType=${filter.chartType}&fuel=${filter.fuelGrade}&pump=${filter.pump}&periode=${periode}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getChartByFuelTankPeriod = async (
  controllerId: string,
  fuelGrade: string,
  tank: string,
  period: string,
  token: string
) => {
  const data = await fetchUrl({
    url: `${CHART_TANK_ENDPOINT}/${fuelGrade}/${tank}/${period}/${controllerId}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};


export const getAllTankDelivery = async (currentPage: number, station:Station,user: User) => {
  const data = await fetchUrl({
    url: `${TANK_CONFIG_READ_DELIVERY_ENDPOINT}/${station.controllerPts.id}?page=${currentPage}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getAllSalesByGrades = async ( station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${ALL_SALES_BY_GRADES}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getAllSalesByPump = async (station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${ALL_SALES_BY_PUMP}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getAllSalesByPumpAndGrades = async (pumpId: number,  station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${ALL_SALES_BY_PUMP_AND_GRADE}/${station.controllerPts.id}/${pumpId}`,
    withCredentials: true,
    crossorigin: true,
    method: 'GET',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getStatTankMeasurment  = async ( station: Station, user: User) => {
  const data = await fetchUrl({
    url: `${TANK_MEASURMENT_STAT}/${station.controllerPts.id}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

export const getLastTankdelivery  = async ( station: Station, user: User, tank:number) => {
  const data = await fetchUrl({
    url: `${TANK_LAST_DELIVERY}/${station.controllerPts.id}/${tank}`,
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });

  return data;
};

