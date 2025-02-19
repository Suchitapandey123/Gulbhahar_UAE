'use client'

import { useState } from 'react'
import TiltArrowUp from './ui/TiltArrowUp'


export default function Cookie() {
  const [activeTab, setActiveTab] = useState('policy')

  const getButtonClass = (tabName) => {
    return `flex items-center w-full border-b px-4 py-3 text-left rounded-lg ${
      activeTab === tabName
        ? 'text-customRed'
        : 'bg-white'
    }`
  }

  return (
    <main className="min-h-screen bg-white font-raleway">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center lg:mt-20 mt-12">
            <p className="text-customRed text-lg font-medium mb-2">Policy</p>
            <h1 className="text-3xl font-bold text-gray-900">
              Cookies Policy
            </h1>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
            Cookies are small text files stored on your device when visiting our website. They help us provide essential features and analyze site usage.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('terms')}
                className={getButtonClass('terms')}
              >
                <span>Terms of Service</span>
                <TiltArrowUp className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={() => setActiveTab('privacy')}
                className={getButtonClass('privacy')}
              >
                <span>Privacy Policy</span>
                <TiltArrowUp className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={() => setActiveTab('policy')}
                className={getButtonClass('policy')}
              >
                <span>Cookie Policy</span>
                <TiltArrowUp className="w-4 h-4 ml-auto" />
              </button>
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 ">
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'policy' && 'What is cookie policy'}
              </h2>

              {activeTab === 'policy' && (
                <div className="">
                  <p className="text-gray-600 leading-relaxed">
                  Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice.
                  </p>

                  <div className="rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Managing Cookies
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Change cookie preferences in browser settings</li>
                      <li>Disable specific cookie types through our cookie banner</li>
                      <li>Contact us for questions about cookie usage</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Types of Cookies
                    </h3>
                    <div className="grid ">
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">1. Essential Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Required for basic website functionality</li>
                          <li>Cannot be disabled</li>
                          <li>Example: Shopping cart data, login sessions</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">2. Analytics Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Track website usage patterns</li>
                          <li>Help improve site performance</li>
                          <li>Can be disabled in browser settings</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">3. Marketing Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Track shopping preferences</li>
                          <li>Enable personalized recommendations</li>
                          <li>Optional and can be disabled</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="prose prose-gray max-w-none">
                  <div>
                  <div className="prose prose-gray max-w-none">
                  <div>
                    <h2 className='text-2xl font-semibold'>What is cookie policy</h2>
                    <p>Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Managing Cookies
                    </h3>
                    <ul className="list-disc pl-6 text-gray-600">
                      <li>Change cookie preferences in browser settings</li>
                      <li>Disable specific cookie types through our cookie banner</li>
                      <li>Contact us for questions about cookie usage</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Types of Cookies
                    </h3>
                    <div className="grid gap-6">
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 ">1. Essential Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Required for basic website functionality</li>
                          <li>Cannot be disabled</li>
                          <li>Example: Shopping cart data, login sessions</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900">2. Analytics Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Track website usage patterns</li>
                          <li>Help improve site performance</li>
                          <li>Can be disabled in browser settings</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 ">3. Marketing Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Track shopping preferences</li>
                          <li>Enable personalized recommendations</li>
                          <li>Optional and can be disabled</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="prose prose-gray max-w-none">
                  <div>
                    <h2 className='text-2xl  font-semibold'>What is cookie policy</h2>
                    <p>Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice.</p>
                  </div>
                  <div className="bg-gray-50  rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Managing Cookies
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Change cookie preferences in browser settings</li>
                      <li>Disable specific cookie types through our cookie banner</li>
                      <li>Contact us for questions about cookie usage</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Types of Cookies
                    </h3>
                    <div className="grid gap-6">
                      <div className="border border-gray-100 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900">1. Essential Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Required for basic website functionality</li>
                          <li>Cannot be disabled</li>
                          <li>Example: Shopping cart data, login sessions</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900">2. Analytics Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Track website usage patterns</li>
                          <li>Help improve site performance</li>
                          <li>Can be disabled in browser settings</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900">3. Marketing Cookies</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Track shopping preferences</li>
                          <li>Enable personalized recommendations</li>
                          <li>Optional and can be disabled</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}