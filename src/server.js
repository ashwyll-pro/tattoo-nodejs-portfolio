import express from "express"
import path from "path"
import ejs from 'ejs'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


//middleware
app.use(express.json())

import tattooRoutes from './presentation/routes/tattoo-routes.js'
import tattooRoutes2 from './presentation/routes/tattoo2-routes.js'
import dashboardRoutes from './presentation/routes/dashboard-routes.js'
import privacyPolicyRoutes from './presentation/routes/privacy-policy-routes.js'
import termsOfuseRoutes from './presentation/routes/terms-of-use-routes.js'
import supportRoutes from './presentation/routes/support-routes.js'

app.use('/api', tattooRoutes)
app.use('/api2', tattooRoutes2)
app.use('/', dashboardRoutes)
app.use("/privacy-policy", privacyPolicyRoutes)
app.use("/terms-of-service", termsOfuseRoutes)
app.use("/support", supportRoutes)

export default app