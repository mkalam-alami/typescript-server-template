import axios from "axios";
import { TestResponse } from "common/test";

window.onload = async function runTest() {
  const response = await axios.get<TestResponse>('/test', { responseType: 'text' });
  document.getElementById('app')!.innerHTML = response.data;
}
