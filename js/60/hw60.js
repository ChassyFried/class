'use strict';
const PIN = 123;

function trackDosage(medicationName, initialDosage) {
    let currentDosage = initialDosage;

    return {
        getInstructions() {
            return { medicationName, currentDosage };
        },

        adjustDosage(doctorPin, newDosage) {
            if (doctorPin === PIN && newDosage > 0) {
                currentDosage = newDosage;
                return currentDosage;
            }
            else {
                console.error("Invalid doctor PIN");
            }
        }
    };
}