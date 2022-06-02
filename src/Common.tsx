const Common = {
  parseJson: (data: string) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  },
  sleep: (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });
  }
};

export const parseJson = Common.parseJson;
export const sleep = Common.sleep;
