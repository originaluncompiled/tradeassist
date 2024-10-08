import React from 'react'
import Section from './Section'
import { strategyChecklist } from '@/constants'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'

// ON MOBILE - as APP: ability to edit strategy => use a popup menu (Shadcn) and then have buttons for "Cancel" & "Submit" (when pressing back button on phone, and you HAVE changed something, show another popup saying "Are You Sure? You Have Unsaved Changes." while *temporarily* hiding edit popup)

const Strategy = () => {

  return (
    <Section caption='Trading Strategy Checklist'>
      {strategyChecklist.map((strategyGroup, groupIndex) => {
        return (
          <section key={groupIndex} className='m-2 mb-3'>

            <h3 className='font-bold' id={`${groupIndex}.1`}>{strategyGroup.title}</h3>
            <h4 className='font-semibold text-sm italic text-neutral-400 pb-1' id={`${groupIndex}.2`}>{strategyGroup.description}</h4>

            {strategyGroup.type === 'radio' ?
              <RadioGroup className='p-1'>
                {strategyGroup.items.map((radioButton, itemIndex) => {
                  return (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={radioButton} id={`${groupIndex}.3.${itemIndex}#${radioButton.replaceAll(' ','')}`} /> {/* So the user can have the same thing multiple times */}
                      <Label
                        htmlFor={`${groupIndex}.3.${itemIndex}#${radioButton.replaceAll(' ','')}`}
                        className='cursor-pointer'
                        id={`${groupIndex}.3.${itemIndex}`}
                      >
                        {radioButton}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup> :

              strategyGroup.items.map((checkbox, itemIndex) => {
                return (
                  <div key={itemIndex} className="flex items-center space-x-2 p-1">
                    <Checkbox value={checkbox} id={`${groupIndex}.3.${itemIndex}#${checkbox.replaceAll(' ','')}`}/>
                    <Label
                      htmlFor={`${groupIndex}.3.${itemIndex}#${checkbox.replaceAll(' ','')}`}
                      className='cursor-pointer'
                    >
                      {checkbox}
                    </Label>
                  </div>
                )
              })

            }
          </section>
        )
      })}
    </Section>
  )
}

export default Strategy