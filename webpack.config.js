const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const { ProvidePlugin } = require("webpack");
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const isDev = mode === 'development';
  const isProduction = mode === 'production';
  const isStaging = process.env.NODE_ENV === 'staging' || mode === 'staging';
  const dotenvFilename = isProduction
    ? '.env.production'
    : isStaging
      ? '.env.staging'
      : '.env.development';
  const isLocal = env.local ?? false;
  const domainEndpoint = () => {
    if (env.development) return "d29q5zo2af0lw0.cloudfront.net";
    if (env.staging) return "d1pba8i1pdjgdk.cloudfront.net";
    return "d2qcfi6co0kj0v.cloudfront.net";
  };

  return {
    mode: isStaging ? 'development' : mode, // Use 'development' mode for staging

    output: {
      publicPath: isDev
        ? "http://localhost:3011/"
        : `https://${domainEndpoint()}/OrderConfirmation/`,
    },
    devtool: isDev ? "source-map" : false,
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3011,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: { fullySpecified: false },
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [{ loader: "file-loader" }],
        },
        {
          test: /\.(scss|sass|css)$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "mfeOrderConfirmation",
        filename: "remoteEntry-search.js",
        remotes: {
          mfeStore: isLocal
            ? "mfeStore@http://localhost:3000/remoteEntry-search.js"
            : `mfeStore@${domainEndpoint()}/Store/remoteEntry-search.js`,
        },
        exposes: {
          "./React": "react",
          "./ReactDOM": "react-dom",
          "./ReactDOMClient": "react-dom/client",
          './OrderConfirmationElement': './src/OrderConfirmationContainerElement',
        },
        shared: {
          ...deps,
          react: { singleton: true, requiredVersion: deps.react },
          "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
          "react-dom/client": { singleton: true, requiredVersion: deps["react-dom"] },
          "@fontsource/roboto": { singleton: true },
        },
      }),

      new HtmlWebPackPlugin({ template: "./src/index.html" }),

      new Dotenv({ path: dotenvFilename }),

      new ProvidePlugin({
        React: "./React",
        ReactDOM: "./ReactDOM",
        ReactDOMClient: "./ReactDOMClient",
      }),
    ],
  };
};