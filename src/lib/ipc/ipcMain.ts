// https://github.com/aviau/noteapp/

export enum IpcMainChannel {
  MAIN_IPC_REQUEST_CHANNEL_REFRESH = 'main:ipc:request-channel-refresh',
  RENDERER_IPC_SET_CHANNEL = 'renderer:ipc:set-channel',
  MAIN_UTILS_PING = 'main:utils:ping',
  MAIN_UTILS_LOG = 'main:utils:log',
  MAIN_UTILS_GET_USER_DATA_PATH = 'main:utils:get-user-data-path',
  MAIN_WINDOWS_MINIMIZE = 'main:windows:minimize',
  MAIN_WINDOWS_MAXIMIZE = 'main:windows:maximize',
  MAIN_WINDOWS_QUIT = 'main:windows:quit',
}

export type IpcMainChannelMessage = IpcMainMessages['request'];
export type IpcMainChannelResponse = IpcMainMessages['response'];

export type IpcMainChannelMessageOf<T extends IpcMainChannel> = Extract<
  IpcMainMessages, {
    type: T
  }
>['request'];

export type IpcMainChannelResponseOf<T extends IpcMainChannel> = Extract<
  IpcMainMessages,{
    type: T
  }
>['response'];

type IpcMainMessages =
  | {
    type: IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH;
    request: null;
    response: null
  }
  | {
    type: IpcMainChannel.RENDERER_IPC_SET_CHANNEL;
    request: null;
    response: null;
  }
  | {
    type: IpcMainChannel.MAIN_UTILS_PING,
    request: {
      data: {
        message: string;
      }
    };
    response: {
      data: {
        message: string;
      }
    };
  }
  | {
    type: IpcMainChannel.MAIN_UTILS_LOG,
    request: {
      data: {
        message: string;
      }
    },
    response: null;
  }
  | {
    type: IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH;
    request: null,
    response: {
      data: {
        path: string;
      }
    }
  }
  | {
    type: IpcMainChannel.MAIN_WINDOWS_MINIMIZE;
    request: null;
    response: null;
  }
  | {
    type: IpcMainChannel.MAIN_WINDOWS_MAXIMIZE;
    request: null;
    response: null;
  }
  | {
    type: IpcMainChannel.MAIN_WINDOWS_QUIT;
    request: null;
    response: null;
  };
