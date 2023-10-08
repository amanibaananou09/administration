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
export const PUMP_UPLOAD_TRANSACTION = `${localhostURL}/api/UploadPumpTransaction`;
//Tank
export const TANK_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/tank`;
export const TANK_CONFIG_READ_DELIVERY_ENDPOINT = `${localhostURL}/api/configuration/delivery`;
export const TANK_MEASURMENTS_ENDPOINT = `${localhostURL}/api/essTransaction/TankMeasurements`;
//Probe
export const PROBE_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/probe`;
//Reader
export const READER_CONFIG_READ_ALL_ENDPOINT = `${localhostURL}/api/configuration/reader`;
//Station
export const STATION_ADD_ENDPOINT = `${localhostURL}/api/station/add`;
export const STATION_UPDATE_ENDPOINT = `${localhostURL}/api/station/update`;
export const STATION_DELETE_ENDPOINT = `${localhostURL}/api/station/delete`;
export const STATION_ALL_ENDPOINT = `${localhostURL}/api/station`;
export const FIND_CONTROLLER_BY_STATION_ENDPOINT = `${localhostURL}/api/station/findController`;
//chart
export const CHART_ENDPOINT = `${localhostURL}/api/data/sales`;
export const CHART_TANK_ENDPOINT = `${localhostURL}/api/data/deliveries`;
export const CHART_STAT_VENT_ENDPOINT = `${localhostURL}/api/data/salesByUser`;
export const CHART_TANK_ALL_BY_IDC = `${localhostURL}/api/data/allTankByIdC`;
export const CHART_TANK_LEVEL_ENDPOINT = `${localhostURL}/api/data/tankLevel`;
export const CHART_TANK_LEVEL_ALL = `${localhostURL}/api/data/tankLevelByPeriod/all`;
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
    let data;
    try {
        data = await response.json();
    }
    catch (error) {
        console.error("body is not a json format");
        data = null;
    }
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
export const getAllFuelGrades = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${FUELGRADES_CONFIG_READ_ALL_ENDPOINT}/${controllerId}`,
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
export const getAllReader = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${READER_CONFIG_READ_ALL_ENDPOINT}/${controllerId}`,
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
export const getAllNozzle = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${NOZZLES_CONFIG_READ_ALL_ENDPOINT}/${controllerId}`,
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
export const getAllPump = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${PUMP_CONFIG_READ_ALL_ENDPOINT}/${controllerId}`,
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
export const getAllTank = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${TANK_CONFIG_READ_ALL_ENDPOINT}/${controllerId}`,
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
export const getAllProb = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${PROBE_CONFIG_READ_ALL_ENDPOINT}/${controllerId}`,
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
export const getUserHistory = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${HISTORY_USER_ENDPOINT}/${controllerId}/Action`,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    return data;
};
export const consultUserHistory = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${HISTORY_USER_ENDPOINT}/${controllerId}/Consult`,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    return data;
};
export const getTankMeasurements = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${TANK_MEASURMENTS_ENDPOINT}/${controllerId}`,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    return data;
};
export const getPumpAuthorizeforhistoryUser = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${HISTORY_USER_ENDPOINT}/${controllerId}/PumpAuthorize`,
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
export const getPumpTransactionwithEndStart = async (start, end, controllerId, token) => {
    const data = await fetchUrl({
        url: `${PUMP_TANSACTION_START_END}/${start}/${end}/${controllerId}`,
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
export const getAllPumpByNozzel = async (controllerId, selectedPump, token) => {
    const data = await fetchUrl({
        url: `${NOZZEL_BY_PUMP_READ_ENDPOINT}/${controllerId}/${selectedPump}`,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    return data;
};
export const getallTransactionPump = async (currentPage, controllerId, token) => {
    const data = await fetchUrl({
        url: `${PUMP_ALL_TRANSACTION_READ_CONFIG}/${controllerId}?page=${currentPage}`,
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
export const createStation = async (station, user) => {
    const { name, address, controllerPtsId } = station;
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
            controllerPtsId,
            userLogin: user.username,
        },
    });
    return data;
};
export const updateStation = async (station, user) => {
    const { name, address, controllerPtsId } = station;
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
            controllerPtsId,
            userLogin: user.username,
        },
    });
    return data;
};
export const deleteStation = async (id, user) => {
    const data = await fetchUrl({
        url: `${STATION_DELETE_ENDPOINT}/${id}`,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
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
export const getStationForUser = async (username, token) => {
    const data = await fetchUrl({
        url: `${STATION_ALL_ENDPOINT}/${username}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    return data;
};
export const getStations = async (user) => {
    return await getStationForUser(user.username, user.token);
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
export const createUserStation = async (firstname, lastname, username, password, email, role, token) => {
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
export const getAllStatVent = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${CHART_STAT_VENT_ENDPOINT}/${controllerId}`,
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
export const getAllTankByIdc = async (controllerId, token) => {
    const data = await fetchUrl({
        url: `${CHART_TANK_ALL_BY_IDC}/${controllerId}`,
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
export const getTankLevelSelected = async (selectedTank, token) => {
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
export const getChartByFuelPumpPeriod = async (controllerId, fuelGrade, pump, period, token) => {
    const data = await fetchUrl({
        url: `${CHART_ENDPOINT}/${fuelGrade}/${pump}/${period}/${controllerId}`,
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
export const getChartByFuelTankPeriod = async (controllerId, fuelGrade, tank, period, token) => {
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
export const getChartTankLevel = async (token) => {
    const data = await fetchUrl({
        url: CHART_TANK_LEVEL_ALL,
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
export const getAllTankDelivery = async (currentPage, controllerId, token) => {
    const data = await fetchUrl({
        url: `${TANK_CONFIG_READ_DELIVERY_ENDPOINT}/${controllerId}?page=${currentPage}`,
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
