const Common = {
  parseJson: (data: string) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  },
  sleep: (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });
  }
};

export default Common;
