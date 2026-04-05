import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ocd-booking-cart-v1";
const OFFER_STORAGE_KEY = "ocd-booking-offers-v1";
const BookingCartContext = createContext(null);

function uniqueServices(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function normalizeOffer(offer) {
  if (!offer || typeof offer !== "object" || !offer.id) return null;

  return {
    id: offer.id,
    title: offer.title || "",
    note: offer.note || "",
    disclaimer: offer.disclaimer || "",
    contactState:
      offer.contactState && typeof offer.contactState === "object"
        ? offer.contactState
        : {},
  };
}

function uniqueOffers(items) {
  const map = new Map();

  (items || []).forEach((item) => {
    const clean = normalizeOffer(item);
    if (clean && !map.has(clean.id)) {
      map.set(clean.id, clean);
    }
  });

  return [...map.values()];
}

export function BookingCartProvider({ children }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setSelectedServices(uniqueServices(parsed));
      }
    } catch {
      setSelectedServices([]);
    }

    try {
      const rawOffers = localStorage.getItem(OFFER_STORAGE_KEY);
      const parsedOffers = rawOffers ? JSON.parse(rawOffers) : [];
      if (Array.isArray(parsedOffers)) {
        setSelectedOffers(uniqueOffers(parsedOffers));
      }
    } catch {
      setSelectedOffers([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedServices));
    localStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify(selectedOffers));

    if (selectedServices.length === 0 && selectedOffers.length === 0) {
      setCartOpen(false);
    }
  }, [selectedServices, selectedOffers]);

  const openCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const addService = useCallback((serviceTitle) => {
    if (!serviceTitle) return;
    setSelectedServices((prev) =>
      prev.includes(serviceTitle) ? prev : [...prev, serviceTitle]
    );
  }, []);

  const removeService = useCallback((serviceTitle) => {
    setSelectedServices((prev) => prev.filter((item) => item !== serviceTitle));
  }, []);

  const toggleService = useCallback((serviceTitle) => {
    if (!serviceTitle) return;
    setSelectedServices((prev) =>
      prev.includes(serviceTitle)
        ? prev.filter((item) => item !== serviceTitle)
        : [...prev, serviceTitle]
    );
  }, []);

  const addManyServices = useCallback((serviceTitles) => {
    const clean = uniqueServices(serviceTitles);
    if (!clean.length) return;

    setSelectedServices((prev) => uniqueServices([...prev, ...clean]));
  }, []);

  const applyOffer = useCallback((offer) => {
    const cleanOffer = normalizeOffer(offer);
    if (!cleanOffer) return;

    setSelectedOffers((prev) => uniqueOffers([...prev, cleanOffer]));
  }, []);

  const removeOffer = useCallback((offerId) => {
    setSelectedOffers((prev) => prev.filter((offer) => offer.id !== offerId));
  }, []);

  const clearOffers = useCallback(() => {
    setSelectedOffers([]);
  }, []);

  const clearServices = useCallback(() => {
    setSelectedServices([]);
    setSelectedOffers([]);
  }, []);

  const value = useMemo(
    () => ({
      selectedServices,
      selectedOffers,
      cartOpen,
      openCart,
      closeCart,
      addService,
      removeService,
      toggleService,
      addManyServices,
      applyOffer,
      removeOffer,
      clearOffers,
      clearServices,
    }),
    [
      selectedServices,
      selectedOffers,
      cartOpen,
      openCart,
      closeCart,
      addService,
      removeService,
      toggleService,
      addManyServices,
      applyOffer,
      removeOffer,
      clearOffers,
      clearServices,
    ]
  );

  return (
    <BookingCartContext.Provider value={value}>
      {children}
    </BookingCartContext.Provider>
  );
}

export function useBookingCart() {
  const context = useContext(BookingCartContext);

  if (!context) {
    throw new Error(
      "useBookingCart must be used inside a BookingCartProvider."
    );
  }

  return context;
}