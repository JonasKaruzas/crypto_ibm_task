fetchCryptoNamesAndIcons = async () => {
  try {
    const response = await fetch("https://www.cryptocompare.com/api/data/coinlist/");
    if (!response.ok) {
      throw new Error("Failed");
    }
    const jsonData = await response.json();

    const namesAndImages = Object.keys(jsonData.Data).reduce((acc, key) => {
      const baseImageUrl = jsonData.BaseImageUrl;

      const { FullName, ImageUrl } = jsonData.Data[key];
      acc[key] = { FullName, ImageUrl: baseImageUrl + ImageUrl };
      return acc;
    }, {});

    return namesAndImages;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fetchCryptoNamesAndIcons };
