import { defineConfig } from "vite";

export default defineConfig({
    esbuild: {
        jsxFactory: "ReactImitation.createElement", // JSX 컴포넌트 생성 함수
        jsxFragment: "ReactImitation.Fragment", // JSX Fragment 처리 함수
    },
});
