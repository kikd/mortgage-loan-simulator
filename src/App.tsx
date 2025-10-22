import {
  MainTemplate,
  CalculatorForm,
  ResultsSection,
  ChartsGrid,
} from './components'
import { useLoanCalculator } from './hooks/useLoanCalculator'

function App() {
  const { formData, calculation, updateFormData, performCalculation } =
    useLoanCalculator()

  return (
    <MainTemplate>
      <CalculatorForm
        formData={formData}
        onFormChange={updateFormData}
        onCalculate={performCalculation}
      />

      {calculation && (
        <>
          <ResultsSection calculation={calculation} formData={formData} />
          <ChartsGrid calculation={calculation} formData={formData} />
        </>
      )}
    </MainTemplate>
  )
}

export default App
