import { MoreAboutContent } from '@/types'
import React from 'react'

interface MoreAboutContentProps {
  MoreAboutContent: MoreAboutContent[]
}

const Home_MoreAbout = ({ MoreAboutContent }: MoreAboutContentProps) => {
  if (!MoreAboutContent?.length) return null

  return (
    <section className="w-full bg-stone-50 py-16 px-4">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {MoreAboutContent.map((item, index) => (
          <div key={index} className="mb-14">
            <h1 className="text-3xl sm:text-4xl font-light text-amber-900 mb-6 tracking-wide">
              {item.h1}
            </h1>

            {item.content && (
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-10">
                {item.content}
              </p>
            )}

            {item.children?.map((h2Item, i) => (
              <div key={i} className="mb-10">
                <h2 className="text-xl sm:text-2xl font-light text-amber-800 border-l-4 border-amber-400 pl-4 mb-4">
                  {h2Item.h2}
                </h2>

                {h2Item.content && (
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 pl-4">
                    {h2Item.content}
                  </p>
                )}

                {h2Item.children?.map((h3Item, j) => (
                  <div key={j} className="mb-6 pl-4">
                    <h3 className="text-base sm:text-lg font-medium text-stone-700 mb-2">
                      {h3Item.h3}
                    </h3>
                    {h3Item.content && (
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {h3Item.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Home_MoreAbout
