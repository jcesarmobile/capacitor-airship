import type { AirshipPluginWrapper } from './plugin';
import { Android, iOS, PushNotificationStatus, PushPayload } from './types';

/**
 * Airship Push.
 */
export class AirshipPush {
  /**
   * iOS only push methods.
   */
  public readonly iOS: AirshipPushIOS;

  /**
   * Android only push methods.
   */
  public readonly android: AirshipPushAndroid;

  constructor(private readonly plugin: AirshipPluginWrapper) {
    this.iOS = new AirshipPushIOS(plugin);
    this.android = new AirshipPushAndroid(plugin);
  }

  /**
   * Enables/disables notifications on Airship.
   *
   * When enabled, it will cause the user to be prompted for
   * the permission on platforms that support it.
   * To get the result of the prompt, use `enableUserNotifications`.
   * @param enabled true to enable, false to disable
   * @returns A promise.
   */
  public setUserNotificationsEnabled(enabled: boolean): Promise<void> {
    return this.plugin.perform('push#setUserNotificationsEnabled', enabled);
  }

  /**
   * Checks if user notifications are enabled or not on Airship.
   * @returns A promise with the result.
   */
  public isUserNotificationsEnabled(): Promise<boolean> {
    return this.plugin.perform('push#isUserNotificationsEnabled');
  }

  /**
   * Enables user notifications.
   * @returns A promise with the permission result.
   */
  public enableUserNotifications(): Promise<boolean> {
    return this.plugin.perform('push#enableUserNotifications');
  }

  /**
   * Gets the notification status.
   * @returns A promise with the result.
   */
  public getNotificationStatus(): Promise<PushNotificationStatus> {
    return this.plugin.perform('push#getNotificationStatus');
  }

  /**
   * Gets the registration token if generated.
   * Use the event EventType.PushTokenReceived to be notified
   * when available.
   * @returns A promise with the result.
   */
  public getPushToken(): Promise<string | null | undefined> {
    return this.plugin.perform('push#getPushToken');
  }

  /**
   * Gets the list of active notifications.
   *
   * On Android, this list only includes notifications
   * sent through Airship.
   * @returns A promise with the result.
   */
  public getActiveNotifications(): Promise<PushPayload[]> {
    return this.plugin.perform('push#getActiveNotifications');
  }

  /**
   * Clears all notifications for the app.
   * @returns A promise with the result.
   */
  public clearNotifications(): Promise<void> {
    return this.plugin.perform('push#clearNotifications');
  }

  /**
   * Clears a specific notification.
   *
   * On Android, you can use this method to clear
   * notifications outside of Airship, The identifier is in
   * the format of <tag>:<id>.
   * @param identifier The identifier.
   * @returns A promise with the result.
   */
  public clearNotification(identifier: string): Promise<void> {
    return this.plugin.perform('push#clearNotification', identifier);
  }
}

/**
 * iOS Push.
 */
export class AirshipPushIOS {
  constructor(private readonly plugin: AirshipPluginWrapper) {}

  /**
   * Sets the foreground presentation options.
   * @param options The foreground options.
   * @returns A promise.
   */
  public setForegroundPresentationOptions(
    options: iOS.ForegroundPresentationOption[],
  ): Promise<void> {
    return this.plugin.perform(
      'push#ios#setForegroundPresentationOptions',
      options,
    );
  }

  /**
   * Sets the notification options.
   * @param options The notification options.
   * @returns A promise.
   */
  public setNotificationOptions(
    options: iOS.NotificationOption[],
  ): Promise<void> {
    return this.plugin.perform('push#ios#setNotificationOptions', options);
  }

  /**
   * Checks if autobadge is enabled.
   * @returns A promise with the result.
   */
  public isAutobadgeEnabled(): Promise<boolean> {
    return this.plugin.perform('push#ios#isAutobadgeEnabled');
  }

  /**
   * Enables/disables autobadge.
   * @param enabled true to enable, false to disable.
   * @returns A promise.
   */
  public setAutobadgeEnabled(enabled: boolean): Promise<void> {
    return this.plugin.perform('push#ios#setAutobadgeEnabled', enabled);
  }

  /**
   * Set the badge number.
   * @param badge The badge number.
   * @returns A promise.
   */
  public setBadgeNumber(badge: number): Promise<void> {
    return this.plugin.perform('push#ios#setBadgeNumber', badge);
  }

  /**
   * Gets the badge number.
   * @returns A promise with the result.
   */
  public getBadgeNumber(): Promise<number> {
    return this.plugin.perform('push#ios#getBadgeNumber');
  }

  /**
   * Enables/disables quiet time.
   *
   * @param enabled true to enable, false to disable
   * @returns A promise with the result.
   */
  public setQuietTimeEnabled(enabled: boolean): Promise<void> {
    return this.plugin.perform('push#ios#setQuietTimeEnabled', enabled);
  }

  /**
   * Checks if quiet time is enabled or not.
   * @returns A promise with the result.
   */
  public isQuietTimeEnabled(): Promise<void> {
    return this.plugin.perform('push#ios#isQuietTimeEnabled');
  }

  /**
   * Sets quiet time.
   *
   * @param quietTime The quiet time.
   * @returns A promise with the result.
   */
  public setQuietTime(quietTime: iOS.QuietTime): Promise<void> {
    return this.plugin.perform('push#ios#setQuietTime', quietTime);
  }

  /**
   * Gets the quiet time settings.
   * @param success Success callback.
   * @param error Error callback.
   */
  /**
   * Gets the quiet time settings.
   *
   * @returns A promise with the result.
   */
  public getQuietTime(): Promise<iOS.QuietTime | null | undefined> {
    return this.plugin.perform('push#ios#getQuietTime');
  }
}

/**
 * Android Push.
 */
export class AirshipPushAndroid {
  constructor(private readonly plugin: AirshipPluginWrapper) {}

  /**
   * Checks if a notification category/channel is enabled.
   * @param channel The channel name.
   * @returns A promise with the result.
   */
  public isNotificationChannelEnabled(channel: string): Promise<boolean> {
    return this.plugin.perform(
      'push#android#isNotificationChannelEnabled',
      channel,
    );
  }

  /**
   * Sets the notification config.
   * @param config The notification config.
   * @returns A promise with the result.
   */
  public setNotificationConfig(
    config: Android.NotificationConfig,
  ): Promise<void> {
    return this.plugin.perform('push#android#setNotificationConfig', config);
  }

  /**
   * Enables/disables showing notifications in the foreground.
   * @param enabled true to enable, false to disable.
   * @returns A promise with the result.
   */
  public setForegroundNotificationsEnabled(enabled: boolean): Promise<void> {
    return this.plugin.perform(
      'push#android#setForegroundNotificationsEnabled',
      enabled,
    );
  }
}
