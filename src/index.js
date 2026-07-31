#!/usr/bin/env node

import { router } from "./router/index.js";

const cmd = process.argv[2] || "chat";

await router(cmd);
