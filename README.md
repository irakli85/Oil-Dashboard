# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Live vessel map data sources

- **Vessel data — AISstream:** [AISstream](https://aisstream.io/) provides AIS messages with vessel positions and, when available, MMSI, name, IMO, and vessel type. The app filters vessels around Batumi Port and receives the feed through its [AIS proxy](https://oil-dashboard-ais.onrender.com/api/ais/batumi/health).
- **Map tiles — OpenStreetMap:** [OpenStreetMap](https://www.openstreetmap.org/) provides the map data, delivered as tiles from `tile.openstreetmap.org`. Map data is maintained by the OpenStreetMap community.
- **Distance to Batumi Port:** calculated by the app from the vessel coordinates and the port coordinates; it is not a separate AISstream field.

