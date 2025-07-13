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
      title: '50% Off To Start',
      imgUrl: '/images/logo.png',
      alt: '50% Off To Start',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.'
    },
    {
      id: 2,
      title: 'Free Ceramic Spray Sealant',
      imgUrl: '/images/logo.png',
      alt: 'Free Ceramic Spray Sealant',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.'
    },
    {
      id: 3,
      title: 'Friends With Benefits?',
      imgUrl: '/images/logo.png',
      alt: 'Friends With Benefits',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.'
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
              <img
                src={offer.imgUrl}
                alt={offer.alt}
                className={styles.image}
                onClick={() => toggleExpand(idx)}
              />
              <div
                className={`${styles.details} ${
                  isOpen ? styles.open : ''
                }`}
              >
                <h3 className={styles.title}>Coming Soon</h3>
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
