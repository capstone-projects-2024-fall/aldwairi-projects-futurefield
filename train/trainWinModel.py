import duckdb
import pandas as pd
import tensorflow as tf

# Step 1: Connect to the baseball.computer database
conn = duckdb.connect('baseball.computer.db')

# Step 2: Query relevant data
query = """
SELECT 
    g.game_id,
    g.home_team,
    g.away_team,
    g.home_team_score,
    g.away_team_score,
    p.home_team_pitcher_id,
    p.away_team_pitcher_id,
    p.home_team_pitcher_stats,
    p.away_team_pitcher_stats
FROM 
    games AS g
JOIN 
    pitchers AS p ON g.home_team_pitcher_id = p.id OR g.away_team_pitcher_id = p.id
WHERE 
    g.date >= '2023-01-01'  -- Adjust the date range as needed
"""
data = conn.execute(query).fetchdf()

# Step 3: Preprocess the data
# Create a new column to represent the winner (1 for home win, 0 for away win)
data['winner'] = (data['home_team_score'] > data['away_team_score']).astype(int)

# Select features and target variable
features = data[['home_team', 'away_team', 'home_team_pitcher_stats', 'away_team_pitcher_stats']]
target = data['winner']

# Manually encode categorical variables using pandas
features_encoded = pd.get_dummies(features[['home_team', 'away_team']], drop_first=True)
numerical_features = pd.concat([features_encoded, features[['home_team_pitcher_stats', 'away_team_pitcher_stats']].reset_index(drop=True)], axis=1)

# Convert the target variable to a numpy array
target_array = target.to_numpy()

# Step 4: Split the dataset into training and test sets
train_size = int(0.8 * len(numerical_features))
X_train = numerical_features[:train_size]
y_train = target_array[:train_size]
X_test = numerical_features[train_size:]
y_test = target_array[train_size:]

# Step 5: Build a TensorFlow model
model = tf.keras.Sequential([
    tf.keras.layers.InputLayer(input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')  # Sigmoid for binary classification
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Step 6: Train the model
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.2)

# Step 7: Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Close the database connection
conn.close()