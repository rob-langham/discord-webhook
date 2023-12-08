import { mock } from "pactum";

// sets port, host
const port = +(process.env.PORT || "3001");
const mockOpts = { port, host: "127.0.0.1" };

async function startMock() {
  await mock.setDefaults(mockOpts);
  await mock.start();
}
