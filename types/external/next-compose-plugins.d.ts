declare module "next-compose-plugins" {
  export const withPlugins = (plugins: $IntentionalAny[], config: $IntentionalAny) => (
    phase: $IntentionalAny,
    defaultConfig: $IntentionalAny
  ) => $IntentionalAny;

  export const optional = (plugin: $IntentionalAny) => {
    plugin[OPTIONAL_SYMBOL] = true;

    return plugin;
  };
}
