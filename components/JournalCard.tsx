<View className='mt-2'>
  {/* A snippet from the "Notes/Takeaways" section */}
  <Text className='text-dark-3 font-medium' numberOfLines={4}>{tradeInfo.peek}</Text>
</View>

// Just has: Date - Asset; Win/Loss (DISPLAYED AS a bookmark coming out from the back of the card in red(loss) & green(win)); ^ Snippet
// On top show "Unjournaled Trades" + Have red dot on icon in navbar when there's unjournaled trades
// ^ If there aren't any just say underneath that heading, "You've journaled all your trades :)"
// Then have "Past Entries"
// Maybe have a border around the snippet