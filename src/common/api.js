export const localhostURL = "http://localhost:8083";
export const webSocketURL = "ws://localhost:8083";
//get idctr
const idCtr = localStorage.getItem("idCtr");
//get ptsId
const PtsId = localStorage.getItem("PtsId");

//controller
export const ALL_CONTROLLERS_ENDPOINT = `${localhostURL}/station/AllContoller`;
export const ADD_CONTROLLERS_ENDPOINT = `${localhostURL}/station/addController`;

//Grades
export const FUELGRADES_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/configuration/read/fuelGrade/${idCtr}`;

//Web_socket
export const CONFIG_WEBSOCKET_ENDPOINT = `${localhostURL}/configuration/ws/${PtsId}`;

//HistoryEdit
export const HISTORY_USER_ACTION_ENDPOINT = `${localhostURL}/user/UserHistory/${idCtr}/Action`;

//HistoryConsult
export const HISTORY_USER_CONSULT_ENDPOINT = `${localhostURL}/user/UserHistory/${idCtr}/Consult`;

//UserHistory
export const HISTORY_USER_PUMPAUTHORIZE_ENDPOINT = `${localhostURL}/user/UserHistory/${idCtr}/PumpAuthorize`;
export const HISTORY_USER_GETID = `${localhostURL}/user/getTranById`;

//login
export const LOGIN_ENDPOINT = `${localhostURL}/login`;

//version
export const VERSION_CONFIG_ENDPOINT = `${localhostURL}/configuration/version`;

//Nozzles
export const NOZZLES_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/configuration/read/nozzle/${idCtr}`;
export const NOZZEL_BY_PUMP_READ_ENDPOINT = `${localhostURL}/configuration/read/nozzleByPump/${idCtr}`;

//Pump
export const PUMP_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/configuration/read/pump/${idCtr}`;
export const PUMP_TANSACTION_START_END = `${localhostURL}/essstatus/uploadPumpTansaction`;
export const PUMP_ALL_TRANSACTION_READ_CONFIG = `${localhostURL}/configuration/read/transaction/${idCtr}`;
export const PUMP_UPLOAD_TRANSACTION = `${localhostURL}/UploadPumpTransaction`;

//Tank
export const TANK_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/configuration/read/tank/${idCtr}`;
export const TANK_MEASURMENTS_ENDPOINT = `${localhostURL}/essTransaction/TankMeasurements/${idCtr}`;

//Probe
export const PROBE_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/configuration/read/probe/${idCtr}`;

//Reader
export const READER_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/configuration/read/reader/${idCtr}`;

//Station
export const STATION_ADD_ENDPOINT = `${localhostURL}/station/addStation`;
export const STATION_LIST_ENDPOINT = `${localhostURL}/station/ListStations`;
export const STATION_ALL_ENDPOINT = `${localhostURL}/station/AllStation`;
export const FIND_CONTROLLER_BY_STATION_ENDPOINT = `${localhostURL}/station/findController`;

//User
export const CREATE_USER_ENDPOINT = `${localhostURL}/createUser`;
export const LIST_USERS_ENDPOINT = `${localhostURL}/listUsers`;
export const REGISTER_USER_ENDPOINT = `${localhostURL}/api/v1/auth/register`;

//chart
export const CHART_ENDPOINT = `${localhostURL}/stat/Chart`;
export const CHART_TANK_ENDPOINT = `${localhostURL}/stat/ChartGradeTank`;
export const CHART_STAT_VENT_ENDPOINT = `${localhostURL}/stat/vent/${idCtr}`;
export const CHART_TANK_ALL_BY_IDC = `${localhostURL}/stat/AllTankByIdC/${idCtr}`;
export const CHART_TANK_LEVEL_ENDPOINT = `${localhostURL}/stat/ChartTankLevel`;
export const CHART_TANK_LEVEL_ALL = `${localhostURL}/stat/ChartTankLevel/all`;

export const fetchUrl = async (config) => {
  const response = await fetch(config.url, {
    method: config.method ? config.method : "GET",
    headers: config.headers,
    body: config.body ? JSON.stringify(config.body) : null,
  });

  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  return data;
};

export const setFuelGradesConfiguration = async (fuelGrades, token) => {
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

export const getAllFuelGrades = async (token) => {
  const data = await fetchUrl({
    url: FUELGRADES_CONFIG_READ_ALL_ENDPOINT,
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
export const getAllReader = async (token) => {
  const data = await fetchUrl({
    url: READER_CONFIG_READ_ALL_ENDPOINT,
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
export const getAllNozzle = async (token) => {
  const data = await fetchUrl({
    url: NOZZLES_CONFIG_READ_ALL_ENDPOINT,
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
export const getAllPump = async (token) => {
  const data = await fetchUrl({
    url: PUMP_CONFIG_READ_ALL_ENDPOINT,
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
export const getAllTank = async (token) => {
  const data = await fetchUrl({
    url: TANK_CONFIG_READ_ALL_ENDPOINT,
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

export const getListUser = async (token) => {
  const data = await fetchUrl({
    url: LIST_USERS_ENDPOINT,
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

export const getAllProb = async (token) => {
  const data = await fetchUrl({
    url: PROBE_CONFIG_READ_ALL_ENDPOINT,
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
export const setPumpNozzlesConfiguration = async (pumpNozzles, token) => {
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

export const setProbesConfiguration = async (ports, probes, token) => {
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
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const setPumpsConfiguration = async (ports, pumps, token) => {
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
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const sendPumpAuthorize = async (pump, nozzle, type, dose, token) => {
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
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const setReadersConfiguration = async (ports, readers, token) => {
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
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const setTanksConfiguration = async (tank, token) => {
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
      Authorization: "Bearer " + token,
    },
    body,
  });

  return data;
};

export const getAllControllers = async (token) => {
  const data = await fetchUrl({
    url: ALL_CONTROLLERS_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const addController = async (station, ptsId, token) => {
  const data = await fetchUrl({
    url: `${ADD_CONTROLLERS_ENDPOINT}/${station}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: {
      ptsId,
    },
  });

  return data;
};

export const login = async (username, password) => {
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

export const getControllerVersion = async (token) => {
  const data = await fetchUrl({
    url: VERSION_CONFIG_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getUserHistory = async (token) => {
  const data = await fetchUrl({
    url: HISTORY_USER_ACTION_ENDPOINT,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const consultUserHistory = async (token) => {
  const data = await fetchUrl({
    url: HISTORY_USER_CONSULT_ENDPOINT,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
export const getTankMeasurements = async (token) => {
  const data = await fetchUrl({
    url: TANK_MEASURMENTS_ENDPOINT,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
export const getPumpAuthorizeforhistoryUser = async (token) => {
  const data = await fetchUrl({
    url: HISTORY_USER_PUMPAUTHORIZE_ENDPOINT,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getIdUserHistory = async (idAction, token) => {
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
export const getPumpTransactionwithEndStart = async (
  start,
  end,
  idCtr,
  token,
) => {
  const data = await fetchUrl({
    url: `${PUMP_TANSACTION_START_END}/${start}/${end}/${idCtr}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      start,
      end,
    },
  });

  return data;
};
export const getAllPumpByNozzel = async (selectedPump, token) => {
  const data = await fetchUrl({
    url: `${NOZZEL_BY_PUMP_READ_ENDPOINT}/${selectedPump}`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getallTransactionPump = async (token) => {
  const data = await fetchUrl({
    url: PUMP_ALL_TRANSACTION_READ_CONFIG,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
export const getUploadTransactionPump = async (token) => {
  const data = await fetchUrl({
    url: PUMP_UPLOAD_TRANSACTION,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
export const createStation = async (name, address, userLogin, token) => {
  const data = await fetchUrl({
    url: STATION_ADD_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: {
      name,
      address,
      userLogin,
    },
  });

  return data;
};
export const getAllStations = async (token) => {
  const data = await fetchUrl({
    url: STATION_LIST_ENDPOINT,
    withCredentials: true,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
export const findControllerByStation = async (stationName, token) => {
  const data = await fetchUrl({
    url: `${FIND_CONTROLLER_BY_STATION_ENDPOINT}/${stationName}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getStationByUser = async (username, token) => {
  const data = await fetchUrl({
    url: `${STATION_ALL_ENDPOINT}/${username}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const createUserStation = async (
  firstname,
  lastname,
  username,
  password,
  email,
  role,
  token,
) => {
  const data = await fetchUrl({
    url: CREATE_USER_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: {
      firstname,
      lastname,
      username,
      password,
      email,
      role,
    },
  });

  return data;
};
export const addUser = async (firstname, lastname, email, password, token) => {
  const data = await fetchUrl({
    url: REGISTER_USER_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: {
      firstname,
      lastname,
      email,
      password,
    },
  });

  return data;
};

export const getAllStatVent = async (token) => {
  const data = await fetchUrl({
    url: CHART_STAT_VENT_ENDPOINT,
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

export const getAllTankByIdc = async (token) => {
  const data = await fetchUrl({
    url: CHART_TANK_ALL_BY_IDC,
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

export const getTankLevelSelected = async (selectedTank,token) => {
  const data = await fetchUrl({
    url: `${CHART_TANK_LEVEL_ENDPOINT}/${selectedTank}`,
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