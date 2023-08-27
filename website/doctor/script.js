document.addEventListener("DOMContentLoaded", function () {
    const dateFilterInput = document.getElementById("date-filter-input");
    const filterButton = document.getElementById("filter-button");
    const appointmentList = document.getElementById("appointment-list");

    let currentAppointmentIndex = 0;

    const appointments = [
        {
            name: "Rahul Sharma",
            issue: "Toothache",
            date: "2023-08-28",
            time: "10:00 "
        },
        {
            name: "Priya Patel",
            issue: "Teeth Cleaning",
            date: "2023-09-02",
            time: "14:30 "
        },
        {
            name: "Amit Khanna",
            issue: "Braces Adjustment",
            date: "2023-09-05",
            time: "11:45 "
        },
        {
            name: "Sneha Gupta",
            issue: "Gum Bleeding",
            date: "2023-09-10",
            time: "13:15 "
        },
        {
            name: "Vikram Singh",
            issue: "Wisdom Teeth Extraction",
            date: "2023-09-12",
            time: "19:30 "
        },
        {
            name: "Anjali Desai",
            issue: "Cavity Filling",
            date: "2023-09-18",
            time: "14:00 "
        },
        {
            name: "Raj Kapoor",
            issue: "Root Canal Treatment",
            date: "2023-09-20",
            time: "11:00 "
        },
        {
            name: "Deepika Joshi",
            issue: "Denture Consultation",
            date: "2023-09-23",
            time: "10:30 "
        },
        {
            name: "Nikhil Mehta",
            issue: "Orthodontic Consultation",
            date: "2023-09-27",
            time: "16:00 "
        },
        {
            name: "Shalini Choudhury",
            issue: "Tooth Sensitivity",
            date: "2023-10-03",
            time: "17:00 "
        },
        {
            name: "Aditi Singh",
            issue: "Checkup",
            date: "2023-10-05",
            time: "15:00 "
        },
        {
            name: "Rajesh Verma",
            issue: "Toothache",
            date: "2023-10-05",
            time: "10:30 "
        },
        {
            name: "Kavita Mehta",
            issue: "Cavity Filling",
            date: "2023-10-05",
            time: "17:30 "
        },
        {
            name: "Alok Sharma",
            issue: "Teeth Cleaning",
            date: "2023-10-05",
            time: "13:00 "
        },
        {
            name: "Meera Jain",
            issue: "Braces Adjustment",
            date: "2023-10-05",
            time: "14:30 "
        }
        // Add more appointment data here
    ];
    
    filterButton.addEventListener("click", function () {
        const selectedDate = dateFilterInput.value;
        updateFilteredAppointments(selectedDate);
    });

    function createAppointmentCard(appointment) {
        const card = document.createElement("div");
        card.className = "appointment";

        const patientDetails = `
            <h2>Patient Details</h2>
            <p>Name: ${appointment.name}</p>
            <p>Issue: ${appointment.issue}</p>
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
        `;

        const rescheduleButton = `
            <button class="reschedule-button" data-index="${appointments.indexOf(appointment)}">Reschedule</button>
        `;

        card.innerHTML = patientDetails + rescheduleButton;
        appointmentList.appendChild(card);
    }
    
    function isAppointmentSlotAvailable(newDate, newTime, appointmentToReschedule) {
        const conflictingAppointment = appointments.find(appointment => {
            return (
                appointment !== appointmentToReschedule &&
                appointment.date === newDate &&
                appointment.time === newTime
            );
        });
    
        return !conflictingAppointment;
    }
    
    function updateFilteredAppointments(date) {
        appointmentList.innerHTML = ""; // Clear previous appointment cards
        const filteredAppointments = appointments.filter(appointment => appointment.date === date);

        if (filteredAppointments.length > 0) {
            filteredAppointments.forEach(appointment => {
                createAppointmentCard(appointment);
            });
        } else {
            const noAppointmentsCard = document.createElement("div");
            noAppointmentsCard.className = "appointment";
            noAppointmentsCard.textContent = "No Appointments";
            appointmentList.appendChild(noAppointmentsCard);
        }
    }

    appointmentList.addEventListener("click", function (event) {
        if (event.target.classList.contains("reschedule-button")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            const appointmentToReschedule = appointments[index];
    
            const existingForm = appointmentList.querySelector(".reschedule-form");
            if (existingForm) {
                existingForm.remove();
            }
    
            // Create and append the reschedule form
            const rescheduleForm = document.createElement("form");
            rescheduleForm.className = "reschedule-form";
    
            const newDateLabel = document.createElement("label");
            newDateLabel.textContent = "New Date:";
            const newDateInput = document.createElement("input");
            newDateInput.type = "date";
            newDateInput.id = "new-date";
            newDateInput.name = "new-date";
            newDateInput.required = true;
    
            const newTimeLabel = document.createElement("label");
            newTimeLabel.textContent = "New Time:";
            const newTimeInput = document.createElement("input");
            newTimeInput.type = "time";
            newTimeInput.id = "new-time";
            newTimeInput.name = "new-time";
            newTimeInput.required = true;
    
            const submitButton = document.createElement("button");
            submitButton.type = "button";
            submitButton.className = "reschedule-submit-button";
            submitButton.textContent = "Reschedule";
            submitButton.addEventListener("click", function () {
                const newDate = newDateInput.value;
                const newTime = newTimeInput.value;
    
                if (newDate && newTime) {
                    const isSlotAvailable = isAppointmentSlotAvailable(newDate, newTime, appointmentToReschedule);
    
                    if (!isSlotAvailable) {
                        alert("Appointment slot is already booked. Please choose a different date and time.");
                        return;
                    }
    
                    const conflictingAppointment = appointments.find(appointment => {
                        return (
                            appointment !== appointmentToReschedule &&
                            appointment.date === newDate &&
                            appointment.time === newTime
                        );
                    });
    
                    if (conflictingAppointment) {
                        alert("Appointment slot is already booked. Please choose a different date and time.");
                    } else {
                        appointmentToReschedule.date = newDate;
                        appointmentToReschedule.time = newTime;
                        updateFilteredAppointments(dateFilterInput.value);
                    }
                }
    
                // Remove the form after rescheduling
                rescheduleForm.remove();
            });
    
            rescheduleForm.appendChild(newDateLabel);
            rescheduleForm.appendChild(newDateInput);
            rescheduleForm.appendChild(document.createElement("br"));
            rescheduleForm.appendChild(newTimeLabel);
            rescheduleForm.appendChild(newTimeInput);
            rescheduleForm.appendChild(document.createElement("br"));
            rescheduleForm.appendChild(submitButton);
    
            // Append the new reschedule form
            event.target.parentElement.appendChild(rescheduleForm);
        }
    });
    
    
    
    // appointmentList.addEventListener("click", function (event) {
    //     if (event.target.classList.contains("reschedule-button")) {
    //         const index = parseInt(event.target.getAttribute("data-index"));
    //         const appointmentToReschedule = appointments[index];
            
    //         // Create and append the reschedule form
    //         const rescheduleForm = document.createElement("form");
    //         rescheduleForm.className = "reschedule-form";
            
    //         const newDateLabel = document.createElement("label");
    //         newDateLabel.textContent = "New Date:";
    //         const newDateInput = document.createElement("input");
    //         newDateInput.type = "date";
    //         newDateInput.id = "new-date";
    //         newDateInput.name = "new-date";
    //         newDateInput.required = true;
            
    //         const newTimeLabel = document.createElement("label");
    //         newTimeLabel.textContent = "New Time:";
    //         const newTimeInput = document.createElement("input");
    //         newTimeInput.type = "time";
    //         newTimeInput.id = "new-time";
    //         newTimeInput.name = "new-time";
    //         newTimeInput.required = true;
            
    //         const submitButton = document.createElement("button");
    //         submitButton.type = "button";
    //         submitButton.className = "reschedule-submit-button";
    //         submitButton.textContent = "Reschedule";
    //         submitButton.addEventListener("click", function () {
    //             const newDate = newDateInput.value;
    //             const newTime = newTimeInput.value;
    
    //             if (newDate && newTime) {
    //                 // Check if the new date and time are available
    //                 const isSlotAvailable = isAppointmentSlotAvailable(newDate, newTime, appointmentToReschedule);
                    
    //                 if (isSlotAvailable) {
    //                     appointmentToReschedule.date = newDate;
    //                     appointmentToReschedule.time = newTime;
    //                     updateFilteredAppointments(dateFilterInput.value);
    //                 } else {
    //                     alert("Appointment slot is already booked. Please choose a different date and time.");
    //                 }
    //             }
    
    //             // Remove the form after rescheduling
    //             rescheduleForm.remove();
    //         });
    
    //         rescheduleForm.appendChild(newDateLabel);
    //         rescheduleForm.appendChild(newDateInput);
    //         rescheduleForm.appendChild(document.createElement("br"));
    //         rescheduleForm.appendChild(newTimeLabel);
    //         rescheduleForm.appendChild(newTimeInput);
    //         rescheduleForm.appendChild(document.createElement("br"));
    //         rescheduleForm.appendChild(submitButton);
    
    //         // Remove the existing reschedule form if it exists
    //         const existingForm = appointmentList.querySelector(".reschedule-form");
    //         if (existingForm) {
    //             existingForm.remove();
    //         }
    
    //         // Append the new reschedule form
    //         event.target.parentElement.appendChild(rescheduleForm);
    //     }
    // });
    
});