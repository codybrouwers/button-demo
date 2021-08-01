/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

// == Types ================================================================

// == Exports ==============================================================

export const IS_SERVER = !!(process.env.NEXT_PUBLIC_IS_SERVER || typeof window === "undefined");
export const IS_CLIENT = !IS_SERVER;

export const DEPLOYMENT_ENVIRONMENT = process.env.NODE_ENV;

export const IS_PRODUCTION = DEPLOYMENT_ENVIRONMENT === "production";
export const IS_DEVELOPMENT = DEPLOYMENT_ENVIRONMENT === "development";
export const IS_TEST = DEPLOYMENT_ENVIRONMENT === "test";
