import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
export default {
  input: "src/jwt.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      exports: "named"
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      typescript: require("typescript"),
      useTsconfigDeclarationDir: true
    })
  ]
};
