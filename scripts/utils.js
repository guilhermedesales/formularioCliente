function formatarDataBrasileira(dataISO) {
    if (!dataISO) return "";
    const partes = dataISO.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
