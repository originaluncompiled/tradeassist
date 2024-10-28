import JournalCard from '@/components/JournalCard'
import { JournalEntry } from '@/constants/types'
import { FlashList } from '@shopify/flash-list'
import { Text, View } from 'react-native'

const Journal = () => {
  const journalHistory: (string | JournalEntry)[] = [
    'Unjournaled Trades',
    {
      date: [28, 3, 2022],
      asset: 'EURUSD',
    },
    {
      date: [29, 3, 2022],
      asset: 'GBPUSD',
    },
    'Past Entries',
    {
      date: [30, 3, 2022],
      asset: 'USDJPY',
      status: 'Break Even',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [31, 3, 2022],
      asset: 'AUDCAD',
      status: 'Win',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [1, 4, 2022],
      asset: 'NZDUSD',
      status: 'Loss',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [2, 4, 2022],
      asset: 'USDCAD',
      status: 'Break Even',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [3, 4, 2022],
      asset: 'EURGBP',
      status: 'Win',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [4, 4, 2022],
      asset: 'GBPJPY',
      status: 'Loss',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [5, 4, 2022],
      asset: 'AUDJPY',
      status: 'Break Even',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [6, 4, 2022],
      asset: 'CADCHF',
      status: 'Win',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [7, 4, 2022],
      asset: 'CHFJPY',
      status: 'Loss',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    },
    {
      date: [8, 4, 2022],
      asset: 'EURCAD',
      status: 'Break Even',
      snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aspernatur tenetur ad, corrupti impedit minus! Quae cum quisquam consectetur veniam ex maxime illo, dolorum accusantium? Beatae fuga explicabo minus nesciunt accusamus, nam dolore nihil cum dolorum sed omnis modi! Facere nisi esse ex, neque repellendus aliquid enim voluptatibus quaerat fuga?'
    }
  ];

  return (
    <View className='flex-1 bg-dark-8 pt-4 pb-2'>
      <FlashList
        data={journalHistory}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            // Render header
            return <Text className='font-bold text-lg ml-6 text-dark-2'>{item}</Text>;
          } else {
            // Render journal card
            return <JournalCard journalInfo={item} />;
          }
        }}
        getItemType={(item) => {
          // To achieve better performance, specify the type based on the item
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        estimatedItemSize={135}
        contentContainerStyle={{ paddingBottom: 74 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Journal