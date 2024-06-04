
//Funktion för att bedömma om leverans skett eller inte
export const calculateDeliveryTime = (approxDeliveryTime) => {

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    const currentTime = parseInt(`${hour}${minutes}`)

    if (currentTime < approxDeliveryTime) {
        return `Ordern är på väg. Beräknad leveranstid är ${approxDeliveryTime}.`
    } else {
        return 'Ordern har levererats.'
    }
}

//Funktion för att sätta leveranstid
export const setDeliveryTime = () => {

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();

    minutes += Math.floor(Math.random() * (20 - 10 + 1) + 10)

    if (minutes >= 60) {
        minutes -= 60
        hour += 1
    }
    if (hour > 24) {
        hour -= 24
    }

    return `${String(hour).padStart(2, "0")}${String(minutes).padStart(2, "0")}`
}
