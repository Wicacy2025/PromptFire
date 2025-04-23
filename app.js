import { createApp, ref, computed } from 'vue';

const app = createApp({
    setup() {
        // Dados do formulário
        const selectedType = ref('');
        const productName = ref('');
        const keyFeatures = ref('');
        const targetAudience = ref('');
        const selectedTone = ref('');
        const generatedPrompt = ref('');
        const copied = ref(false);

        // Lista de tipos de prompt
        const promptTypes = ref([
            { id: 'car', name: 'Venda de Carro' },
            { id: 'motorcycle', name: 'Venda de Moto' },
            { id: 'property', name: 'Venda de Imóvel' },
            { id: 'electronics', name: 'Venda de Eletrônicos' },
            { id: 'clothing', name: 'Venda de Roupas' },
            { id: 'food', name: 'Venda de Alimentos' },
            { id: 'service', name: 'Venda de Serviços' },
            { id: 'software', name: 'Venda de Software' },
            { id: 'course', name: 'Venda de Curso' }
        ]);

        // Tons de comunicação
        const tones = ref([
            'Profissional',
            'Amigável',
            'Entusiasmado',
            'Urgente',
            'Exclusivo',
            'Informativo',
            'Persuasivo',
            'Humorístico'
        ]);

        // Validação do formulário
        const isFormValid = computed(() => {
            return selectedType.value && 
                   productName.value.trim() && 
                   keyFeatures.value.trim() && 
                   targetAudience.value.trim() && 
                   selectedTone.value;
        });

        // Templates de prompt para cada tipo
        const promptTemplates = {
            car: (data) => {
                return `Crie um texto persuasivo para venda do veículo ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Inclua:
1. Um título chamativo
2. Descrição detalhada do veículo
3. Destaque para os diferenciais
4. Condições de pagamento sugeridas
5. Uma chamada para ação

O texto deve ser dividido em parágrafos curtos e usar linguagem que desperte desejo de compra e sensação de oportunidade única.`;
            },
            motorcycle: (data) => {
                return `Elabore um anúncio de venda para a moto ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Estruture o anúncio com:
1. Título impactante destacando o modelo
2. Parágrafo introdutório sobre a experiência de pilotar esta moto
3. Detalhamento técnico e diferenciais
4. Benefícios para o estilo de vida do comprador
5. Informações sobre condições de pagamento/entrega
6. Chamada para ação convidando para test drive`;
            },
            property: (data) => {
                return `Desenvolva um anúncio imobiliário para venda de ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Inclua:
1. Título destacando a localização e principal diferencial
2. Descrição detalhada dos cômodos e metragem
3. Destaque para a vizinhança e infraestrutura local
4. Menção a reformas ou acabamentos especiais
5. Condições de financiamento sugeridas
6. Uma chamada para agendamento de visita`;
            },
            electronics: (data) => {
                return `Crie uma descrição de produto para venda do dispositivo eletrônico ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Estruture com:
1. Título destacando o principal benefício do produto
2. Introdução ao problema que o produto resolve
3. Lista de especificações técnicas
4. Comparação implícita com produtos similares
5. Descrição da experiência de uso
6. Garantia e política de devolução
7. Oferta especial ou limitada
8. Chamada para compra imediata`;
            },
            clothing: (data) => {
                return `Elabore uma descrição para venda do item de vestuário ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Inclua:
1. Título que destaque estilo e exclusividade
2. Descrição do material e qualidade da peça
3. Sugestões de combinação e ocasiões para uso
4. Diferenciais de conforto e durabilidade
5. Informações sobre tamanhos disponíveis
6. Política de trocas simplificada
7. Chamada para ação estimulando compra rápida`;
            },
            food: (data) => {
                return `Crie um texto promocional para venda do produto alimentício ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Estruture com:
1. Título que desperte o apetite e curiosidade
2. Descrição sensorial (sabores, aromas, texturas)
3. Ingredientes principais e diferencial de qualidade
4. Benefícios para saúde ou bem-estar (se aplicável)
5. Sugestões de consumo ou receitas rápidas
6. Informações sobre validade e conservação
7. Opções de entrega ou retirada
8. Chamada para pedido imediato`;
            },
            service: (data) => {
                return `Desenvolva um texto para venda do serviço de ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Inclua:
1. Título focado no principal benefício ou problema resolvido
2. Descrição da dor/necessidade do cliente
3. Apresentação da solução (seu serviço)
4. Diferenciais competitivos e garantias oferecidas
5. Depoimentos ou resultados de clientes anteriores
6. Processo de contratação simplificado
7. Preços e pacotes disponíveis
8. Chamada para agendamento ou orçamento`;
            },
            software: (data) => {
                return `Crie um texto persuasivo para venda do software ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Estruture com:
1. Headline focada no problema principal que o software resolve
2. Descrição da situação atual do usuário e suas dificuldades
3. Apresentação da solução com recursos principais
4. Benefícios tangíveis (economia de tempo, dinheiro, produtividade)
5. Comparação com alternativas (sem nomear concorrentes)
6. Compatibilidade e requisitos técnicos
7. Planos, preços e garantia de satisfação
8. FAQ com objeções comuns
9. Chamada para teste gratuito ou demonstração`;
            },
            course: (data) => {
                return `Elabore um texto para venda do curso ${data.productName} com as seguintes características: ${data.keyFeatures}.

O texto deve ser direcionado para ${data.targetAudience} e usar um tom ${data.tone.toLowerCase()}.

Inclua:
1. Título que prometa uma transformação clara
2. Descrição do problema ou limitação atual do público
3. Apresentação do instrutor e sua credibilidade
4. Conteúdo programático resumido
5. Diferenciais metodológicos
6. Resultados concretos que os alunos alcançarão
7. Bônus ou materiais complementares
8. Depoimentos de alunos anteriores
9. Garantia de satisfação
10. Oferta com prazo limitado
11. FAQ respondendo principais objeções
12. Chamada para inscrição imediata`;
            }
        };

        // Função para gerar o prompt
        const generatePrompt = () => {
            const promptData = {
                productName: productName.value,
                keyFeatures: keyFeatures.value,
                targetAudience: targetAudience.value,
                tone: selectedTone.value
            };

            // Seleciona o template correto baseado no tipo
            const templateFunction = promptTemplates[selectedType.value];
            
            if (templateFunction) {
                generatedPrompt.value = templateFunction(promptData);
            } else {
                generatedPrompt.value = 'Erro: Tipo de prompt não encontrado';
            }
        };

        // Função para copiar o prompt
        const copyPrompt = () => {
            navigator.clipboard.writeText(generatedPrompt.value).then(() => {
                copied.value = true;
                setTimeout(() => {
                    copied.value = false;
                }, 2000);
            });
        };

        return {
            selectedType,
            productName,
            keyFeatures,
            targetAudience,
            selectedTone,
            promptTypes,
            tones,
            generatedPrompt,
            copied,
            isFormValid,
            generatePrompt,
            copyPrompt
        };
    }
});

app.mount('#app');

