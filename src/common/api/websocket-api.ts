import api from "common/api/axios";

const API_URL = "/configuration/ws";

export const setFuelGradesConfiguration = async (fuelGrades: string) => {
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

  const response = await api.post(API_URL, body);

  return response.data;
};

export const setPumpNozzlesConfiguration = async (pumpNozzles: string) => {
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

  const response = await api.post(API_URL, body);

  return response.data;
};

export const setProbesConfiguration = async (ports: number, probes: number) => {
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

  const response = await api.post(API_URL, body);

  return response.data;
};

export const setPumpsConfiguration = async (ports: number, pumps: string) => {
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

  const response = await api.post(API_URL, body);

  return response.data;
};

export const sendPumpAuthorize = async (
  pump: string,
  nozzle: string,
  type: string,
  dose: number,
) => {
  const body = {
    Protocol: "jsonPTS",
    PtsId: "",
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

  const response = await api.post(API_URL, body);

  return response.data;
};

export const setReadersConfiguration = async (
  ports: number,
  readers: string,
) => {
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

  const response = await api.post(API_URL, body);

  return response.data;
};

export const setTanksConfiguration = async (tank: string) => {
  var body = {
    Protocol: "jsonPTS",
    PtsId: "",
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

  const response = await api.post(API_URL, body);

  return response.data;
};
