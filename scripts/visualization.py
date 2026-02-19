import matplotlib.pyplot as plt
import seaborn as sns



def plot_price_trend(combined_data, commodity, location=None):
    """Plot historical price trends for a specific commodity."""
    subset = combined_data[combined_data['Commodity'] == commodity]
    if location:
        subset = subset[subset['Location'] == location]
    
    plt.figure(figsize=(12, 6))
    sns.lineplot(x='Date', y='Price', data=subset, hue='Location')
    plt.title(f'Price Trend for {commodity}')
    plt.xlabel('Date')
    plt.ylabel('Price (KSh)')
    plt.xticks(rotation=45)
    plt.legend(title='Location')
    plt.grid(True)
    plt.show()



def plot_histogram(combined_data, column):
    """Plot a histogram for a given column."""
    plt.figure(figsize=(8, 5))
    sns.histplot(combined_data[column], bins=20, kde=True, color='blue')
    plt.title(f'Histogram of {column}')
    plt.xlabel(column)
    plt.ylabel('Frequency')
    plt.grid(True)
    plt.show()

def plot_bar_chart(combined_data, category_col, value_col):
    """Plot a bar chart for categorical data."""
    plt.figure(figsize=(10, 6))
    sns.barplot(x=category_col, y=value_col, data=combined_data, palette='viridis')
    plt.title(f'Bar Chart of {value_col} by {category_col}')
    plt.xlabel(category_col)
    plt.ylabel(value_col)
    plt.xticks(rotation=45)
    plt.grid(axis='y')
    plt.show()

def plot_scatter(combined_data, x_col, y_col, hue=None):
    """Plot a scatter plot for two numerical variables."""
    plt.figure(figsize=(8, 6))
    sns.scatterplot(x=x_col, y=y_col, data=combined_data, hue=hue, palette='coolwarm')
    plt.title(f'Scatter Plot of {x_col} vs {y_col}')
    plt.xlabel('')
    plt.ylabel(y_col)
    plt.grid(True)
    plt.show()

def plot_boxplot(combined_data, y_col):
    """Plot a boxplot to visualize distributions."""
    plt.figure(figsize=(8, 6))
    sns.boxplot(y=y_col, data=combined_data, palette='pastel')
    plt.title(f'Boxplot of {y_col}')
    plt.xlabel('')
    plt.ylabel(y_col)
    plt.grid(True)
    plt.show()

    
def plot_pairplot(combined_data, columns):
    """Plot a pairplot to visualize relationships between numerical variables."""
    sns.pairplot(combined_data[columns], diag_kind='kde', plot_kws={'alpha': 0.7})
    plt.show()