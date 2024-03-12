import { AirshipPluginWrapper } from './plugin';
import { FeatureFlag } from './types';

/**
 * Airship feature flag manager.
 */
export class AirshipFeatureFlagManager {
  constructor(private readonly plugin: AirshipPluginWrapper) {}

 /**
   * Retrieve a given flag's status and associated data by its name.
   * @param {string} flagName The flag name
   * @return {Promise<FeatureFlag>} A promise resolving to the feature flag
   *   requested.
   * @throws {Error} when failed to fetch
   */
  public flag(
    flagName: string
  ): Promise<FeatureFlag> {
    return this.plugin.perform('featureFlagManager#flag', flagName);
  }

 /**
   * Tracks a feature flag interaction event.
   * @param {FeatureFlag} flag The flag
   * @return {Promise<Void>} A promise with an empty result.
   * @throws {Error} when failed to fetch
   */
  public trackInteraction(flag: FeatureFlag): Promise<void> {
    return this.plugin.perform('featureFlagManager#trackInteraction', flag);
  }
}
