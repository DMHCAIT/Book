import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CategoryButtons from '../components/CategoryButtons'

const testimonials = [
  {
    name: 'Ankit Kasana',
    role: 'Businessman (Real Estate)',
    text: 'Awesome experience with call my tailor.. nice fitting with efficient work.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/ankit-kasana-min.jpg',
  },
  {
    name: 'Vineet Basist',
    role: 'Businessman',
    text: 'I have ordered and received several items now. Everything I received fit perfectly, and is good quality.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/happclint-min.jpg',
  },
  {
    name: 'Mohit Arya',
    role: 'Builder',
    text: 'Awesome fabrics plus fitting worth, liked a lot, and i will surely recommend to my all relatives.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/mohit-arya-min.jpg',
  },
  {
    name: 'Sudhir Dayma',
    role: 'Businessman',
    text: 'Incredible service, Really impressed with nice fitting, fine fabric. I recommend you give a chance to callmytailor.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/sudhir-dayma-min.jpg',
  },
  {
    name: 'Prateek Bhardwaj',
    role: 'Journalist, India TV',
    text: 'Best service, awesome clothes.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/prateek-min.jpg',
  },
  {
    name: 'Rahul Basist',
    role: 'Interior Designer',
    text: 'Well designed indo western about fitting and fabrics. I am 100% satisfied with callmytailor.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/rahul-basist-2-min.jpg',
  },
]

export default function HomePage() {
  return (
    <main className="page-fade">
      <Hero />
      <CategoryButtons />




    </main>
  )
}
