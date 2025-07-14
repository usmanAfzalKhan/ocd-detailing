// src/components/OffersRow.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './OffersRow.module.css'

export default function OffersRow() {
  const [expandedIdx, setExpandedIdx] = useState(null)
  const navigate = useNavigate()

  const offers = [
    {
      id: 1,
      title: 'Refer a Friend & Save 20%',
      imgUrl: '/images/offer-refer-friend.png',
      desc:
        'Share OCD Detailing with a friend—you both get 20% off your next service when you book together. Mention each other at checkout!'
    },
    {
      id: 2,
      title: 'First Time Detail – 20% Off',
      imgUrl: '/images/offer-first-time.png',
      desc:
        'New customers enjoy 20% off their first full mobile detail. Experience showroom-fresh shine at an exclusive introductory rate.'
    }
  ]

  const toggleExpand = idx =>
    setExpandedIdx(expandedIdx === idx ? null : idx)

  const handleLearnMore = title =>
    navigate('/contact', { state: { service: title } })

  return (
    <section className={styles.offersSection}>
      <h2 className={styles.heading}>Our Special Offers</h2>
      <div className={styles.grid}>
        {offers.map((offer, idx) => {
          const isOpen = expandedIdx === idx
          return (
            <div key={offer.id} className={styles.card}>
              <div
                className={styles.imageWrapper}
                onClick={() => toggleExpand(idx)}
              >
                <img
                  src={offer.imgUrl}
                  alt={offer.title}
                  className={styles.image}
                />
              </div>
              <div
                className={`${styles.details} ${
                  isOpen ? styles.open : ''
                }`}
              >
                <h3 className={styles.title}>{offer.title}</h3>
                <p className={styles.text}>{offer.desc}</p>
                <button
                  className={styles.button}
                  onClick={() => handleLearnMore(offer.title)}
                >
                  Learn More
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
