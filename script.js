// script.js

// Data for locations
const locations = {
    location1: {
        imageSrc: "Stop1.jpeg",
        textContent: "The city of Troy is the one that Aeneas begun his journey from. During the Trojan war the city of troy was invaded by the Greeks. Aeneas was one of the few survivors of the war. He fled the city with his father and son, loosing his wife in the process. During his escape he was prophesized to found a new in Italy."
    },
    location2: {
        imageSrc: "Stop2.jpeg",
        textContent: "In Thrace Aeneas attempts to contruct a city but due to a curse fails. This is because the land is cursed to have blood seep from the ground when plants are uprooted. He is warned by a ghost to flee, and he does so after provide funeral."
    },
    location3: {
        imageSrc: "Stop3.jpeg",
        textContent: "In Delos Aeneas prays to Apollo for guidence being told by him to seek his ancient mother. It is interpreted to mean going to Crete thus he journies towards it."
    },
    location4: {
        imageSrc: "Stop4.jpeg",
        textContent: "In Crete Aeneas attempts to build a city but is afflicted by a plague. Durring this he has a vision tht Italy is his true destination. He then sails to Italy."
    },
    location5: {
        imageSrc: "Stop5.jpeg",
        textContent: "In the Strophades island on his way to Italy, he is attacked by harpies who curse them with famine. Despite this they continue on their journey to their new home."
    },
    location6: {
        imageSrc: "Stop6.jpeg",
        textContent: "Continuing his journey, he stops at Buthrotum where he meets with the leaders of a small kingdom modeled off of troy in which he recieves pivotal advice about how he should navigate to italy."
    },
    location7: {
        imageSrc: "Stop7.jpeg",
        textContent: "He lands in Sicily near mount Etna. There he meets a greek man in which he rescues but the victory is short lived as he soon has to flee from polyphemus who amoung other cyclops live in the area."
    },
    location8: {
        imageSrc: "Stop8.jpeg",
        textContent: "While sailing toward main land Italy the goddess, Juno, sends a storm that leads him to Carthage. There Dido, the Queen of Carthage falls in love with him due to Venus' devine intervention. This stalls Aeneas' journy to Italy until the god, Mercury, reminds him of his duty. Due to this reminder Aeneas leaves Dido and Carthage, leading to her suicide, which cursed Aeneas."
    },
    location9: {
        imageSrc: "Stop9.jpeg",
        textContent: "Finaly after stoping once more in Sicily, Aeneas lands in Italy which was then known as Latium. There he is greeted by the king who offers him his daughter in marriage. Due to this surrounds tribe entered conflict with Aeneas and the king leading to a war in which Aeneas comes out victorius founding Lavinium."
    }
};
function drawLines() {
    const canvas = document.getElementById("mapCanvas");
    const container = document.querySelector(".map-container");
    const pins = document.querySelectorAll(".pin");

    // Set canvas dimensions to match the container
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    ctx.strokeStyle = "red"; // Line color
    ctx.lineWidth = 4; // Line thickness

    // Get positions of all pins
    const pinPositions = Array.from(pins).map(pin => {
        const rect = pin.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - container.offsetLeft,
            y: rect.top + rect.height / 2 - container.offsetTop
        };
    });

    // Draw arcs between consecutive pins
    ctx.beginPath();
    for (let i = 0; i < pinPositions.length - 1; i++) {
        const startPin = pinPositions[i];
        const endPin = pinPositions[i + 1];

        // Calculate control point for the arc (slightly downward)
        const controlPointX = (startPin.x + endPin.x) / 2;
        const controlPointY = Math.max(startPin.y, endPin.y) + 50; // Adjust downward curve

        // Draw quadratic curve
        ctx.moveTo(startPin.x, startPin.y);
        ctx.quadraticCurveTo(controlPointX, controlPointY, endPin.x, endPin.y);
    }
    ctx.stroke();
}
drawLines(); // Initial draw

// Open Modal
function openModal(event, locationId) {
    const modal = document.getElementById("modal");
    
    // Set content dynamically
    const modalImage = document.getElementById("modalImage");
    const modalText = document.getElementById("modalText");
    
    modalImage.src = locations[locationId].imageSrc;
    modalText.textContent = locations[locationId].textContent;

    // Position modal near the clicked pin
    const pinRect = event.target.getBoundingClientRect();
    
    modal.style.top = `${pinRect.top + window.scrollY}px`;
    modal.style.left = `${pinRect.left + window.scrollX}px`;
    
    // Display the modal
    modal.style.display = "block";
}

// Close Modal
function closeModal() {
    const modal = document.getElementById("modal");
    
    modal.style.display = "none";
}

