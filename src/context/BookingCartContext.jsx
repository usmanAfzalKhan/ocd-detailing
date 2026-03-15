import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ocd-booking-cart-v1";
const BookingCartContext = createContext(null);

function uniqueServices(items) {
  return [...new Set((items || []).filter(Boolean))];
}

export function BookingCartProvider({ children }) {
  const [selectedServices, setSelectedServices] = useState([]);
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
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedServices));
    if (selectedServices.length === 0) {
      setCartOpen(false);
    }
  }, [selectedServices]);

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
    setCartOpen(true);
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
    setCartOpen(true);
  }, []);

  const addManyServices = useCallback((serviceTitles) => {
    const clean = uniqueServices(serviceTitles);
    if (!clean.length) return;

    setSelectedServices((prev) => uniqueServices([...prev, ...clean]));
    setCartOpen(true);
  }, []);

  const clearServices = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const value = useMemo(
    () => ({
      selectedServices,
      cartOpen,
      openCart,
      closeCart,
      addService,
      removeService,
      toggleService,
      addManyServices,
      clearServices,
    }),
    [
      selectedServices,
      cartOpen,
      openCart,
      closeCart,
      addService,
      removeService,
      toggleService,
      addManyServices,
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