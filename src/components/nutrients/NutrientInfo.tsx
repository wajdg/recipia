import React from 'react';

interface NutrientInfoProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NutrientInfo: React.FC<NutrientInfoProps> = ({ calories, protein, carbs, fat }) => {
  const nutrients = [
    { name: 'Calories', value: calories, unit: 'kcal', color: 'bg-orange-500' },
    { name: 'Protein', value: protein, unit: 'g', color: 'bg-blue-500' },
    { name: 'Carbs', value: carbs, unit: 'g', color: 'bg-green-500' },
    { name: 'Fat', value: fat, unit: 'g', color: 'bg-yellow-500' }
  ];

  const totalMacros = protein + carbs + fat;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nutrients.map((nutrient) => (
          <div 
            key={nutrient.name} 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="text-sm text-gray-500 mb-1">{nutrient.name}</div>
            <div className="text-2xl font-semibold">
              {nutrient.value}
              <span className="text-sm font-normal text-gray-500 ml-1">
                {nutrient.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Macronutrient Breakdown</h3>
        
        <div className="h-6 flex rounded-full overflow-hidden mb-4">
          <div 
            className="bg-blue-500 h-full"
            style={{ width: `${(protein / totalMacros) * 100}%` }}
          ></div>
          <div 
            className="bg-green-500 h-full"
            style={{ width: `${(carbs / totalMacros) * 100}%` }}
          ></div>
          <div 
            className="bg-yellow-500 h-full"
            style={{ width: `${(fat / totalMacros) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Protein: {Math.round((protein / totalMacros) * 100)}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Carbs: {Math.round((carbs / totalMacros) * 100)}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Fat: {Math.round((fat / totalMacros) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutrientInfo;