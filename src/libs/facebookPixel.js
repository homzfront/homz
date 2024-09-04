import ReactPixel from 'react-facebook-pixel';
import "dotenv/config";

export const initFacebookPixel = () => {
    const options = {
        autoConfig: true,
        debug: false,
    };

    ReactPixel.init(`${process.env.NEXT_PUBLIC_PIXEL_ID}`, {}, options);
};

export const trackPageView = () => {
    ReactPixel.pageView();
};

export const trackCustomEvent = (eventName, data) => {
    ReactPixel.track(eventName, data);
};