// submitButton.addEventListener("click", function () {
//     const selectedDate = appointmentDateInput.value;
//     const selectedTime = document.getElementById("appointment-time").value; // Get the selected time
//     const availableAppointments = {
//         "2023-08-28": ["09:00", "11:00", "14:00"],
//         "2023-08-30": ["10:00", "13:00", "16:00"],
//         "2023-09-02": ["08:00", "12:00", "15:00"]
//     }; // Mock available appointments

//     if (availableAppointments[selectedDate]?.includes(selectedTime)) {
//         alert("Appointment booked for " + selectedDate + " at " + selectedTime);
//     } else {
//         alert("Sorry, the selected date and time are not available for booking.");
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit-btn");
    const appointmentDateInput = document.getElementById("appointment-date");

    submitButton.addEventListener("click", function () {
        const selectedDate = appointmentDateInput.value;
        const selectedTime = document.getElementById("appointment-time").value;
        const isRescheduleConfirmed = document.getElementById("reschedule-confirm").checked;

        const availableAppointments = {
            "2023-08-28": ["09:00", "11:00", "14:00"],
            "2023-08-30": ["10:00", "13:00", "16:00"],
            "2023-09-02": ["08:00", "12:00", "15:00"]
        };

        if (availableAppointments[selectedDate]?.includes(selectedTime)) {
            if (isRescheduleConfirmed) {
                alert("Appointment booked for " + selectedDate + " at " + selectedTime);
            } else {
                alert("Appointment not booked. Patient prefers not to reschedule.");
            }
        } else {
            alert("Sorry, the selected date and time are not available for booking.");
        }
    });
});

