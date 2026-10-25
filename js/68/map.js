
const GEONAMES_USERNAME = "csoro";

const [
    { Map, InfoWindow },
    { AdvancedMarkerElement }
] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker")
]);
let savedPlaces = JSON.parse(localStorage.getItem("savedPlaces")) || [];
const map = new Map(document.getElementById("map"), {
    zoom: 18,
    minZoom: 2,
    center: { lat: 51.5072, lng: -0.1276 },
    renderingType: "VECTOR",
    mapTypeId: "satellite",
    mapId: "DEMO_MAP_ID"
});

const infoWindow = new InfoWindow();

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsList = document.getElementById("results-list");
const clearButton = document.getElementById("clear");


const geonamesMarkers = [];

let searchRequestId = 0;

function contentForPlace(place) {
    const content = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = place.title || "Untitled";
    content.appendChild(heading);

    const summary = document.createElement("p");
    summary.textContent =
        place.summary || "No summary available.";
    content.appendChild(summary);

    if (place.wikipediaUrl) {
        const link = document.createElement("a");

        if (/^https?:\/\//i.test(place.wikipediaUrl)) {
            link.href = place.wikipediaUrl;
        } else {
            const articlePath =
                place.wikipediaUrl.split("/").pop();

            link.href =
                `https://${place.lang || "en"}.wikipedia.org/wiki/` +
                articlePath;
        }

        link.textContent = "Read More";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        content.appendChild(link);
    }

    return content;
}

function clearSearchMarkers() {
    geonamesMarkers.forEach(marker => {
        marker.map = null;
    });

    geonamesMarkers.length = 0;
}

function getPosition(place) {
    if (place.lat == null || place.lng == null) {
        return null;
    }

    const lat = Number(place.lat);
    const lng = Number(place.lng);


    return { lat, lng };
}

function createResultItem(place, position, marker) {
    const item = document.createElement("div");

    item.className = "result-item";


    const titleText = place.title;



    if (place.thumbnailImg) {
        const img = document.createElement("img");

        img.src = place.thumbnailImg.replace(
            /^http:/i,
            "https:"
        );

        img.alt = titleText;

        img.onerror = () => {
            img.style.display = "none";
        };

        item.appendChild(img);
    }

    const details = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = titleText;

    const summary = document.createElement("p");
    summary.textContent =
        place.summary || "No summary available.";

    details.append(title, summary);
    item.appendChild(details);

    function selectResult() {
        document
            .querySelectorAll(".result-item.active")
            .forEach(element => {
                element.classList.remove("active");
            });

        item.classList.add("active");

        map.panTo(position);
        map.setZoom(15);

        infoWindow.setContent(contentForPlace(place));

        infoWindow.open({
            map,
            anchor: marker
        });
    }

    item.addEventListener("click", selectResult);

    item.addEventListener("keydown", event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            selectResult();
        }
    });

    return item;
}

async function searchPlaces(query) {
    const requestId = ++searchRequestId;


    const params = new URLSearchParams({
        q: query,
        maxRows: "100",
        username: GEONAMES_USERNAME
    });

    const url =
        `https://secure.geonames.org/wikipediaSearchJSON?${params.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data = await response.json();

        if (requestId !== searchRequestId) {
            return;
        }

        if (data.status) {
            throw new Error(
                data.status.message || "GeoNames error"
            );
        }

        if (!Array.isArray(data.geonames)) {
            throw new Error("Invalid GeoNames response");
        }
        savedPlaces.push(...data.geonames);
        localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));

        const bounds = new google.maps.LatLngBounds();

        let validResults = 0;

        data.geonames.forEach(place => {
            const position = getPosition(place);
            if (!position) return;

            const marker = createMarker(place, position);
            geonamesMarkers.push(marker);

            const item = createResultItem(place, position, marker);
            resultsList.appendChild(item);

            bounds.extend(position);
            validResults++;
        });

        if (validResults > 0) {
            map.fitBounds(bounds, 60);
        } else {
            resultsList.textContent =
                "No results with valid coordinates were found.";
        }



    } catch (error) {
        if (requestId !== searchRequestId) {
            return;
        }

        console.error("GeoNames search failed:", error);

        resultsCount.textContent = "Search failed";

        statusElement.textContent =
            error.message ||
            "Search failed. Please try again.";

        resultsList.textContent =
            "Unable to load results. Please try again.";
    }
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    searchPlaces(query);
});

if (searchInput.value.trim()) {
    searchPlaces(searchInput.value.trim());
}
function createMarker(place, position) {
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: place.title
    });

    marker.addListener("click", () => {
        infoWindow.setContent(contentForPlace(place));
        infoWindow.open({ map, anchor: marker });
    });

    return marker;
}
function loadPrevious() {
    const bounds = new google.maps.LatLngBounds();

    savedPlaces.forEach(place => {
        const position = getPosition(place);
        if (!position) return;

        const marker = createMarker(place, position);
        geonamesMarkers.push(marker);

        const item = createResultItem(place, position, marker);
        resultsList.appendChild(item);

        bounds.extend(position);
    });

    if (geonamesMarkers.length > 0) {
        map.fitBounds(bounds);
    }
}
loadPrevious();
clearButton.addEventListener("click", () => {
    savedPlaces = [];
    localStorage.removeItem("savedPlaces");
    clearSearchMarkers();
    resultsList.replaceChildren();
    infoWindow.close();
});